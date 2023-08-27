// 给异步方法加loading效果，只是一个好看点的交互效果
import ora from 'ora';

export const loading = async (fn, msg, ...args) => {
  // 计数器，失败自动重试最大次数为3，超过3次就直接返回失败
  let counter = 0;
  const run = async () => {
    const spinner = ora(msg);
    spinner.start();
    try {
      const result = await fn(...args);
      spinner.succeed();
      return result;
    } catch (error) {
      spinner.fail('something go wrong, refetching...');
      if (++counter < 3) {
        return run();
      } else {
        return Promise.reject();
      }
    }
  };
  return run();
};