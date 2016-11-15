import Ember from 'ember';
import assign from './assign-polyfill';
import getCmdKey from './get-cmd-key';
import { getKeyCode } from 'ember-keyboard';

const triggerKeyEvent = function triggerKeyEvent(eventType, rawCode, element) {
  const event = Ember.$.Event(eventType);
  const [code, ...modifiers] = rawCode.split('+');
  const properties = modifiers.reduce((properties, modifier) => {
    modifier = modifier === 'cmd' ? getCmdKey() : modifier;
    properties[`${modifier}Key`] = true;

    return properties;
  }, {});

  assign(event, { code, keyCode: getKeyCode(code) }, properties);

  Ember.$(element || document).trigger(event);
};

const triggerKeyDown = function triggerKeyDown(code, element) {
  triggerKeyEvent('keydown', code, element);
};

const triggerKeyPress = function triggerKeyPress(code, element) {
  triggerKeyEvent('keypress', code, element);
};

const triggerKeyUp = function triggerKeyUp(code, element) {
  triggerKeyEvent('keyup', code, element);
};

export {
  triggerKeyDown,
  triggerKeyPress,
  triggerKeyUp
};
