const parseEnv = () => {
  const prefix = 'RSS_';
  const environmentVariables = process.env;
  for (const key in environmentVariables) {
    if (key.startsWith(prefix)) {
      const value = environmentVariables[key];
      console.log(`${key}=${value}`);
    }
  }
};

parseEnv();
