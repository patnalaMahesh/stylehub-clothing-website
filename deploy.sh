#!/bin/bash

echo "🚀 StyleHub Deployment Script"
echo "=============================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Build the project
echo "📦 Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

# Deploy frontend
echo "🌐 Deploying frontend to Vercel..."
vercel --prod

echo "🎉 Deployment completed!"
echo "Your website is now live!"
