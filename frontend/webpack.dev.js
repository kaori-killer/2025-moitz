import path from 'node:path';
import { fileURLToPath } from 'node:url';

import dotenv from 'dotenv';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import common from './webpack.common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mode = 'development';

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
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
  output: {
    filename: '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new webpack.DefinePlugin(defineEnv)],
});
