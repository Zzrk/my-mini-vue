import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { createAppAPI } from "./createApp";
import { Fragment, Text } from "./vnode";

export function createRenderer(options) {
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options;

  function render(vnode, container) {
    // patch
    patch(vnode, container, null);
  }

  function patch(vnode, container, parentComponent) {
    const { type, shapeFlag } = vnode;

    // Fragment -> 只渲染 children
    switch (type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        // ShapeFlags
        if (shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent);
        } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          processComponent(vnode, container, parentComponent);
        }
        break;
    }
  }

  function processText(vnode, container) {
    const { children } = vnode;
    const textNode = (vnode.el = document.createTextNode(children));
    container.append(textNode);
  }

  function processFragment(vnode, container, parentComponent) {
    mountChildren(vnode, container, parentComponent);
  }

  function processElement(vnode, container, parentComponent) {
    mountElement(vnode, container, parentComponent);
  }

  function mountElement(vnode, container, parentComponent) {
    const el = (vnode.el = hostCreateElement(vnode.type));
    // const el = (vnode.el = document.createElement(vnode.type));
    // canvas
    // new ELement()

    // string or array
    const { children, shapeFlag } = vnode;
    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      // text_children
      el.textContent = children;
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      // array_children
      mountChildren(vnode, el, parentComponent);
    }

    // props
    const { props } = vnode;
    for (const key in props) {
      const val = props[key];

      hostPatchProp(el, key, val);
      // const isOn = (key: string) => /^on[A-Z]/.test(key);
      // if (isOn(key)) {
      //   const event = key.slice(2).toLowerCase();
      //   el.addEventListener(event, val);
      // } else {
      //   el.setAttribute(key, val);
      // }
    }
    // canvas 
    // el.x = 10

    hostInsert(el, container);
    // container.append(el);
    // canvas
    // addChild()
  }

  function mountChildren(vnode, container, parentComponent) {
    vnode.children.forEach(v => patch(v, container, parentComponent));
  }

  function processComponent(vnode, container, parentComponent) {
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(initialVNode, container, parentComponent) {
    const instance = createComponentInstance(initialVNode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
  }

  function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    // vnode -> patch
    // vnode -> element -> mountElement

    patch(subTree, container, instance);

    // element mount 完成
    initialVNode.el = subTree.el;
  }

  return {
    createApp: createAppAPI(render)
  }
}