// @ts-ignore
const soynode = require('soynode');

// TODO: Remove "src" from path.
import {PluginComponent} from '@amagaki/amagaki/src/plugins';
import {Pod} from '@amagaki/amagaki/src/pod';
import {TemplateEngineComponent} from '@amagaki/amagaki/src/templateEngine';

class SoyPlugin implements PluginComponent {
  config: Record<string, any>;
  pod: Pod;

  constructor(pod: Pod, config: Record<string, any>) {
    this.pod = pod;
    this.config = config;
    this.pod.engines.associate('.soy', SoyTemplateEngine);
  }
}

class SoyTemplateEngine implements TemplateEngineComponent {
  pod: Pod;

  private warm: Boolean;

  constructor(pod: Pod) {
    this.pod = pod;
    this.warm = false;
    soynode.setOptions({
      allowDynamicRecompile: pod.env.dev,
    });
  }

  _render(path: string, context: any) {
    return soynode.render(path.replace('.soy', ''), {
      ctx: context
    });
  }

  async render(path: string, context: any): Promise<string> {
    const basePath = this.pod.getAbsoluteFilePath('/views/');
    return new Promise((resolve, reject) => {
      if (this.warm) {
        resolve(this._render(path, context));
      } else {
        soynode.compileTemplates(basePath, (err: string) => {
          if (err) {
            reject(err);
            return;
          }
          this.warm = true;
          resolve(this._render(path, context));
        });
      }
    });
  }

  async renderFromString(template: string, context: any): Promise<string> {
    return '';
  } 
}

export function register(pod: Pod, config: any) {
    pod.plugins.register(SoyPlugin, config);
}