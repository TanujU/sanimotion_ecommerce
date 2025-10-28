// Test script to verify Supabase connection and products table
// Run this in your browser console or as a Node.js script

const { createClient } = require("@supabase/supabase-js");

// Your Supabase credentials (from .env.local)
const supabaseUrl = "https://jhuzlnqwtedmryyhksmr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpodXpsbnF3dGVkbXJ5eWhrc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczOTk3MDgsImV4cCI6MjA3Mjk3NTcwOH0.MX8Y5erKC4xfM9TINQeC8xpODKgzfgcpEj_T4Z1mlX0";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConnection() {
  try {
    console.log("Testing Supabase connection...");

    // Test 1: Check if products table exists
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .limit(1);

    if (error) {
      console.error("❌ Error accessing products table:", error);
      console.log(
        "🔧 Solution: Run the fix-products-table.sql script in Supabase"
      );
      return false;
    }

    console.log("✅ Products table exists and is accessible");
    console.log("📊 Total products found:", products?.length || 0);

    // Test 2: Get all products
    const { data: allProducts, error: allError } = await supabase
      .from("products")
      .select("*")
      .order("name", { ascending: true });

    if (allError) {
      console.error("❌ Error fetching all products:", allError);
      return false;
    }

    console.log("✅ Successfully fetched all products");
    console.log(
      "📋 Products:",
      allProducts?.map((p) => `${p.name} - €${p.price}`).join(", ")
    );

    return true;
  } catch (error) {
    console.error("❌ Connection test failed:", error);
    return false;
  }
}

// Run the test
testSupabaseConnection().then((success) => {
  if (success) {
    console.log("🎉 Supabase connection test passed!");
  } else {
    console.log("💥 Supabase connection test failed!");
  }
});
