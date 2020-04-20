import Vue from 'vue';
import {ValidationProvider,ValidationObserver} from "vee-validate";
import { extend } from "vee-validate";

import * as rules from 'vee-validate/dist/rules';
import ar from 'vee-validate/dist/locale/ar.json';

// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: ar.messages[rule] // add its message
  });
}
