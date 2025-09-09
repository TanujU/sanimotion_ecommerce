import { supabase } from './supabase';

// Industry standard session timeout values
export const SESSION_CONFIG = {
  // 30 minutes of inactivity
  IDLE_TIMEOUT: 30 * 60 * 1000, // 30 minutes in milliseconds
  
  // 8 hours maximum session duration
  MAX_SESSION_DURATION: 8 * 60 * 60 * 1000, // 8 hours in milliseconds
  
  // 5 minutes warning before auto logout
  WARNING_TIME: 5 * 60 * 1000, // 5 minutes in milliseconds
  
  // Check session validity every 5 minutes
  SESSION_CHECK_INTERVAL: 5 * 60 * 1000, // 5 minutes in milliseconds
};

export interface SessionWarning {
  timeRemaining: number;
  showWarning: boolean;
}

class SessionManager {
  private idleTimer: NodeJS.Timeout | null = null;
  private sessionTimer: NodeJS.Timeout | null = null;
  private warningTimer: NodeJS.Timeout | null = null;
  private sessionCheckTimer: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();
  private sessionStartTime: number = Date.now();
  private onLogoutCallback: (() => void) | null = null;
  private onWarningCallback: ((warning: SessionWarning) => void) | null = null;
  private isInitialized: boolean = false;

  constructor() {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    if (this.isInitialized) return;
    
    this.setupEventListeners();
    this.startSessionMonitoring();
    this.isInitialized = true;
  }

  private setupEventListeners() {
    // Only setup event listeners on client side
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, this.resetIdleTimer.bind(this), true);
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    
    // Track beforeunload to clean up session
    window.addEventListener('beforeunload', this.cleanup.bind(this));
  }

  private resetIdleTimer() {
    this.lastActivity = Date.now();
    
    // Clear existing timers
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
    
    // Set new idle timer
    this.idleTimer = setTimeout(() => {
      this.handleIdleTimeout();
    }, SESSION_CONFIG.IDLE_TIMEOUT);
    
    // Set warning timer (5 minutes before idle timeout)
    this.warningTimer = setTimeout(() => {
      this.showIdleWarning();
    }, SESSION_CONFIG.IDLE_TIMEOUT - SESSION_CONFIG.WARNING_TIME);
  }

  private handleVisibilityChange() {
    // Only handle visibility changes on client side
    if (typeof document === 'undefined') return;
    
    if (document.hidden) {
      // Page is hidden, pause timers
      this.pauseTimers();
    } else {
      // Page is visible, resume timers
      this.resumeTimers();
    }
  }

  private pauseTimers() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
  }

  private resumeTimers() {
    const timeSinceLastActivity = Date.now() - this.lastActivity;
    
    if (timeSinceLastActivity >= SESSION_CONFIG.IDLE_TIMEOUT) {
      // User has been idle too long, logout immediately
      this.handleIdleTimeout();
    } else {
      // Reset timers based on remaining time
      this.resetIdleTimer();
    }
  }

  private showIdleWarning() {
    if (this.onWarningCallback) {
      this.onWarningCallback({
        timeRemaining: SESSION_CONFIG.WARNING_TIME,
        showWarning: true
      });
    }
  }

  private async handleIdleTimeout() {
    console.log('Session idle timeout reached, logging out user');
    await this.logout();
  }

  private async handleMaxSessionDuration() {
    console.log('Maximum session duration reached, logging out user');
    await this.logout();
  }

  private startSessionMonitoring() {
    // Set maximum session duration timer
    this.sessionTimer = setTimeout(() => {
      this.handleMaxSessionDuration();
    }, SESSION_CONFIG.MAX_SESSION_DURATION);

    // Start periodic session validation
    this.sessionCheckTimer = setInterval(async () => {
      await this.validateSession();
    }, SESSION_CONFIG.SESSION_CHECK_INTERVAL);

    // Initialize idle timer
    this.resetIdleTimer();
  }

  private async validateSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        console.log('Session validation failed, logging out user');
        await this.logout();
        return;
      }

      // Check if session is expired
      if (session.expires_at && new Date(session.expires_at) <= new Date()) {
        console.log('Session expired, logging out user');
        await this.logout();
        return;
      }

      // Update session in database
      await this.updateSessionInDatabase(session);
    } catch (error) {
      console.error('Session validation error:', error);
      await this.logout();
    }
  }

  private async updateSessionInDatabase(session: any) {
    try {
      const { error } = await supabase
        .from('sessions')
        .upsert({
          user_id: session.user.id,
          token: session.access_token,
          expires_at: session.expires_at,
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Failed to update session in database:', error);
      }
    } catch (error) {
      console.error('Error updating session in database:', error);
    }
  }

  private async logout() {
    try {
      // Clean up session from database
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase
          .from('sessions')
          .delete()
          .eq('user_id', session.user.id);
      }

      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Call logout callback
      if (this.onLogoutCallback) {
        this.onLogoutCallback();
      }
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      this.cleanup();
    }
  }

  public setOnLogoutCallback(callback: () => void) {
    this.onLogoutCallback = callback;
  }

  public setOnWarningCallback(callback: (warning: SessionWarning) => void) {
    this.onWarningCallback = callback;
  }

  public ensureInitialized() {
    // Ensure session manager is initialized on client side
    if (typeof window !== 'undefined' && !this.isInitialized) {
      this.initialize();
    }
  }

  public extendSession() {
    console.log('Session extended by user activity');
    this.resetIdleTimer();
  }

  public getSessionInfo() {
    const now = Date.now();
    const timeSinceLastActivity = now - this.lastActivity;
    const sessionDuration = now - this.sessionStartTime;
    
    return {
      timeSinceLastActivity,
      sessionDuration,
      idleTimeRemaining: SESSION_CONFIG.IDLE_TIMEOUT - timeSinceLastActivity,
      maxSessionTimeRemaining: SESSION_CONFIG.MAX_SESSION_DURATION - sessionDuration,
    };
  }

  public cleanup() {
    if (this.idleTimer) clearTimeout(this.idleTimer);
    if (this.sessionTimer) clearTimeout(this.sessionTimer);
    if (this.warningTimer) clearTimeout(this.warningTimer);
    if (this.sessionCheckTimer) clearInterval(this.sessionCheckTimer);
    
    this.idleTimer = null;
    this.sessionTimer = null;
    this.warningTimer = null;
    this.sessionCheckTimer = null;
  }
}

// Export singleton instance
export const sessionManager = new SessionManager();
