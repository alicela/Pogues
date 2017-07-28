import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { COMPONENT_TYPE } from 'constants/pogues-constants';
import ComponentNewContainer from 'questionnaire/containers/component/component-new';
import Dictionary from 'utils/dictionary/dictionary';

const { QUESTION, SEQUENCE, SUBSEQUENCE } = COMPONENT_TYPE;

class GenericInput extends Component {
  static propTypes = {
    placeholders: PropTypes.object.isRequired,
    saveActiveQuestionnaire: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      showNewComponentModal: false,
      typeNewComponent: undefined,
    };

    this.handleOpenNewComponent = this.handleOpenNewComponent.bind(this);
    this.handleCloseNewComponent = this.handleCloseNewComponent.bind(this);
  }

  handleOpenNewComponent(componentType) {
    const newState = {
      ...this.state,
      showNewComponentModal: true,
      typeNewComponent: componentType,
    };
    this.setState(newState);
  }

  handleCloseNewComponent() {
    const newState = {
      ...this.state,
      showNewComponentModal: false,
      typeNewComponent: undefined,
    };
    this.setState(newState);
  }

  render() {
    const { placeholders } = this.props;
    const typeNewComponent = this.state.typeNewComponent;
    const newComponentParent = typeNewComponent ? placeholders[typeNewComponent].parent : '';
    const newComponentWeight = typeNewComponent ? placeholders[typeNewComponent].weight : 0;

    return (
      <div id="questionnaire-generic-input" style={{ display: this.state.showNewComponentModal ? 'none' : 'block' }}>
        <span>{Dictionary.addObject}</span>
        <button
          id="add-question"
          className="btn-white"
          disabled={placeholders[QUESTION].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(QUESTION);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{Dictionary.question}
        </button>
        <button
          id="add-sequence"
          className="btn-white"
          disabled={placeholders[SEQUENCE].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(SEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{Dictionary.sequence}
        </button>
        <button
          id="add-subsequence"
          className="btn-white"
          disabled={placeholders[SUBSEQUENCE].parent === ''}
          onClick={() => {
            this.handleOpenNewComponent(SUBSEQUENCE);
          }}
        >
          <span className="glyphicon glyphicon-plus" />{Dictionary.subSequence}
        </button>
        <button className="btn-white"><span className="glyphicon glyphicon-plus" />{Dictionary.pageBreak}</button>
        <button className="btn-yellow" onClick={this.props.saveActiveQuestionnaire}>
          {Dictionary.save}<span className="glyphicon glyphicon-floppy-disk" />
        </button>
        <button className="btn-yellow">{Dictionary.visualise}<span className="glyphicon glyphicon-eye-open" /></button>
        <button className="btn-yellow">
          {Dictionary.publishQuestionnaire}<span className="glyphicon glyphicon-share-alt" />
        </button>
        <button className="btn-yellow">{Dictionary.duplicate}<span className="glyphicon glyphicon-duplicate" /></button>
        <button className="btn-yellow">{Dictionary.remove}<span className="glyphicon glyphicon-trash" /></button>
        <ReactModal
          shouldCloseOnOverlayClick={false}
          isOpen={this.state.showNewComponentModal}
          onRequestClose={this.handleCloseNewComponent}
          contentLabel={this.state.typeNewComponent ? Dictionary[`componentNew${this.state.typeNewComponent}`] : ''}
        >
          <div className="popup">
            <div className="popup-header">
              <h3>{this.state.typeNewComponent ? Dictionary[`componentNew${this.state.typeNewComponent}`] : ''}</h3>
              <button onClick={this.handleCloseNewComponent}><span>X</span></button>
            </div>
            <div className="popup-body">
              <ComponentNewContainer
                parentId={newComponentParent}
                weight={newComponentWeight}
                type={this.state.typeNewComponent}
                onCancel={this.handleCloseNewComponent}
                onSuccess={this.handleCloseNewComponent}
              />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

export default GenericInput;