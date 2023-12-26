module.exports = {
  description: 'create a component',
  prompts: [
    {
      type: 'input',
      name: 'dir',
      message: 'Please enter path dir，such as "Decorates/Mores/MultiBackImg" :',
      validate(value) {
        if (!value || value.trim === '') {
          return 'name is required';
        }
        return true;
      },
    },
  ],
  actions: (data) => {
    const dir = data.dir;

    // 首字母大写

    const actions = [
      {
        type: 'add',
        path: `${process.cwd()}/src/packages/components/${dir}/config.ts`, // 这里的name就是上面定义的键
        templateFile: './component-template/config.ts.hbs',
        data: {},
      },
      {
        type: 'add',
        path: `${process.cwd()}/src/packages/components/${dir}/config.vue`, // 这里的name就是上面定义的键
        templateFile: './component-template/config.vue.hbs',
        data: {},
      },
      {
        type: 'add',
        path: `${process.cwd()}/src/packages/components/${dir}/index.ts`, // 这里的name就是上面定义的键
        templateFile: './component-template/index.ts.hbs',
        data: {},
      },
      {
        type: 'add',
        path: `${process.cwd()}/src/packages/components/${dir}/index.vue`, // 这里的name就是上面定义的键
        templateFile: './component-template/index.vue.hbs',
        data: {},
      },
    ];

    return actions;
  },
};
