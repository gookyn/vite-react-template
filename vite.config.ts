import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { ConfigEnv, UserConfigExport, defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh'; // 提供React Refresh支持
import vitePluginImp from 'vite-plugin-imp'; // 按需加载组件

export default ({ command, mode }: ConfigEnv) => {
  // 更新node运行环境变量
  updateProcessEnv({ command, mode });

  // 配置项
  const config: UserConfigExport = {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src/'),
        '@/apis': path.resolve(__dirname, './src/apis/'),
        '@/assets': path.resolve(__dirname, './src/assets/'),
        '@/images': path.resolve(__dirname, './src/assets/images/'),
        '@/components': path.resolve(__dirname, './src/components/'),
        '@/config': path.resolve(__dirname, './src/config/'),
        '@/pages': path.resolve(__dirname, './src/pages/'),
        '@/routers': path.resolve(__dirname, './src/routers/'),
        '@/utils': path.resolve(__dirname, './src/utils/'),
      },
    },
    plugins: [
      reactRefresh(),
      vitePluginImp({
        libList: [
          {
            libName: 'antd-mobile',
            style: (name) => `antd-mobile/es/${name}/style/index.css`,
            libDirectory: 'es',
          },
        ],
      }),
    ],
  };

  // serve 独有配置
  if (command === 'serve') {
    config.define = {
      'process.env.NODE_ENV': JSON.stringify('development'),
    };
    config.server = {
      host: '0.0.0.0',
      port: 8201,
      open: '/welcome',
      hmr: true,
      proxy: {
        '/api': {
          target: process.env.VITE_API_HOST,
          changeOrigin: true,
        },
      },
    };
  } else if (command === 'build') {
    // build 独有配置
    config.define = {
      'process.env.NODE_ENV': JSON.stringify('production'),
    };
  }

  // 包裹 ts 类型提示
  return defineConfig(config);
};

// 更新node运行环境变量
function updateProcessEnv({ command, mode }: ConfigEnv): void {
  const envFilePath: any = getEnvFilePath(mode);

  try {
    // 根据环境变量加载环境变量文件
    const envFile: object = dotenv.parse(fs.readFileSync(envFilePath));

    // 根据获取的key给对应的环境变量赋值
    for (const key in envFile) {
      process.env[key] = envFile[key];
    }
  } catch (e) {
    console.error(e);
  }
}

// 获取可加载的环境变量文件路径
function getEnvFilePath(mode: string): string | void {
  const modeFilePath = path.join(__dirname, `./.env.${mode}`);
  const localFilePath = path.join(__dirname, './.env.local');

  if (fs.existsSync(modeFilePath)) {
    console.log(`使用${mode}模式配置文件`);
    return modeFilePath;
  } else if (fs.existsSync(localFilePath)) {
    console.log(`${mode}模式配置文件不存在，将使用本地模式配置文件`);
    return localFilePath;
  } else {
    console.log(`${mode}模式和本地模式配置文件均不存在，请按照 README 执行或者检查项目文件`);
    process.exit(1);
  }
}
