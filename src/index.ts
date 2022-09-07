// mini-vue 出口
export * from './runtime-dom'

import { baseCompile } from './compiler-core/src'
import * as runtimeDom from './runtime-dom'
import { registerRuntimeCompiler } from './runtime-dom'

function compileToFunction(template) {
  console.log(template);
  const { code } = baseCompile(template);
  const render = new Function('Vue', code)(runtimeDom);

  return render;

  // const render = renderFunction();

  // function renderFunction(Vue) {
  //   const { 
  //     toDisplayString: _toDisplayString, 
  //     openBlock: _openBlock,
  //     createElementVNode: _createElementVNode 
  //   } = Vue;
  //   return function render(_ctx, _cache, $props, $setup, $data, $options) { 
  //     return (
  //       _openBlock(),
  //       _createElementVNode(
  //         "div", 
  //         null, 
  //         'hi, ' + _toDisplayString(_ctx.message)
  //       ) 
  //     )
  //   }
  // }
}

registerRuntimeCompiler(compileToFunction);