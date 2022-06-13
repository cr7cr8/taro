const config = {
  projectName: "taro",
  date: "2022-5-24",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  //plugins: ['@tarojs/plugin-html'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      }
    },
    // 这个时候我们整个应用就完成了。但如果你把这个应用放在真机小程序中，尤其是一些性能不高的真机中，切换到此页面的时间可能会比较长，会有一段白屏时间。

    // 这是由于 Taro 的渲染机制导致的：在页面初始化时，原生小程序可以从本地直接取数据渲染，但 Taro 会把初始数据通过 React/Vue 渲染成一颗 DOM 树，然后将这颗 DOM 树序列化之后交给小程序渲染。也就是说，比起原生小程序 Taro 会在页面初始化时多一次调用 setData 函数的支出——而大部分小程序的性能问题是 setData 数据过大导致的。

    // 为了解决这个问题，Taro 引入了一种名为预渲染（Prerender）的技术，和服务端渲染一样，在 Taro CLI 直接将要渲染的页面转换为 wxml 字符串，这样就获得了与原生小程序一致甚至更快的速度。

    // 使用预渲染也非常简单，我们只要进行简单的配置即可：
    // https://taro-docs.jd.com/taro/docs/guide/#%E5%85%A5%E5%8F%A3%E7%BB%84%E4%BB%B6
    prerender: {
      include: ['pages/nodes/nodes'], // `pages/nodes/nodes` 也会参与 prerender
    }
  },
  h5: {
    devServer: { port: 3008 },
    publicPath: "/",
    staticDirectory: "static",
  //  esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
