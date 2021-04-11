// TODO: Remove "src" from path.
import {PluginComponent} from '@amagaki/amagaki/src/plugins';
import {Pod} from '@amagaki/amagaki/src/pod';
import {TemplateEngineComponent} from '@amagaki/amagaki/src/templateEngine';

class HtmPlugin implements PluginComponent {
  config: Record<string, any>;
  pod: Pod;

  constructor(pod: Pod, config: Record<string, any>) {
    this.pod = pod;
    this.config = config;
    this.pod.engines.associate('.htm', HtmTemplateEngine);
  }
}

class HtmTemplateEngine implements TemplateEngineComponent {
  pod: Pod;

  constructor(pod: Pod) {
    this.pod = pod;
  }

  async render(path: string, context: any): Promise<string> {
    const modulePath = this.pod.getAbsoluteFilePath(path);
    if (this.pod.env.dev) {
      delete require.cache[require.resolve(modulePath)];
    }
    const renderer = require(modulePath);
    return renderer(context);
  }

  async renderFromString(template: string, context: any): Promise<string> {
    return '';
  }
}

export function register(pod: Pod, config: any) {
    pod.plugins.register(HtmPlugin, config);
}