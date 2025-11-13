import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = 'production';

// .env 파일 로드 시도 (절대 경로 사용)
const envPath = path.resolve(__dirname, '.env');
const dotenvResult = dotenv.config({ path: envPath });
const envVars = dotenvResult.parsed || {};

// DefinePlugin에 주입할 형태로 변환 + NODE_ENV 보장
const defineEnv = Object.entries(envVars).reduce(
  (acc, [key, value]) => {
    acc[`process.env.${key}`] = JSON.stringify(value);
    return acc;
  },
  { 'process.env.NODE_ENV': JSON.stringify(mode) },
);

export default merge(common(envVars), {
  mode,
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(defineEnv),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { passes: 2 },
          mangle: true,
          format: { comments: false },
        },
      }),
    ],
    splitChunks: { chunks: 'all' },
    runtimeChunk: 'single',
  },
  performance: {
    hints: false,
  },
});
