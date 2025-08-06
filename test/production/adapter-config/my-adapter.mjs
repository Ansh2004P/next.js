// @ts-check
/** @type {import('next').NextAdapter } */
const myAdapter = {
  name: 'my-custom-adapter',
  modifyConfig: (config) => {
    console.log('called modify config in adapter')
    config.basePath = '/docs'
    return config
  },
  onBuildComplete: (ctx) => {
    console.log('onBuildComplete')
    console.log(ctx)
  },
}

export default myAdapter
