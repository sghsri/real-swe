'use babel';

import RealSweView from './real-swe-view';
import { CompositeDisposable } from 'atom';

export default {

  realSweView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.realSweView = new RealSweView(state.realSweViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.realSweView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'real-swe:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.realSweView.destroy();
  },

  serialize() {
    return {
      realSweViewState: this.realSweView.serialize()
    };
  },


  toggle() {
      let editor = atom.workspace.getActiveTextEditor();
        if (editor) {
          let selected_text = editor.getSelectedText();
          if(selected_text.includes('#realswe:'))
          editor.insertText();
        }
  }

};
