import _ from 'lodash';
import { QueryCtrl } from 'app/plugins/sdk';
import './query_filter_ctrl';
import { StackdriverPicker } from './components/StackdriverPicker';
import { react2AngularDirective } from 'app/core/utils/react2angular';
import { registerAngularDirectives } from './angular_wrappers';
import { Target } from './types';

export class StackdriverQueryCtrl extends QueryCtrl {
  static templateUrl = 'partials/query.editor.html';
  uiSegmentSrv: any;

  /** @ngInject */
  constructor($scope, $injector, uiSegmentSrv) {
    super($scope, $injector);
    this.uiSegmentSrv = uiSegmentSrv;
    react2AngularDirective('stackdriverPicker', StackdriverPicker, [
      'options',
      'onChange',
      'selected',
      'searchable',
      'className',
      'placeholder',
      'groupName',
      ['templateVariables', { watchDepth: 'reference' }],
    ]);
    registerAngularDirectives();
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleExecuteQuery = this.handleExecuteQuery.bind(this);
  }

  handleQueryChange(target: Target) {
    Object.assign(this.target, target);
  }

  handleExecuteQuery() {
    this.$scope.ctrl.refresh();
  }
}
