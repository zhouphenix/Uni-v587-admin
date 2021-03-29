import { getParent } from "../js_sdk/v587-toolbox/common.js"

export default {
    computed: {
        $form() {
            return getParent.call(this, "ClForm", [
                "labelWidth",
                "labelPosition",
                "showMessage",
                "model",
                "validateOnValueChange",
                "disabled"
            ]);
        },

        isDisabled() {
            return this.$form ? (this.$form.disabled || this.disabled) : this.disabled
        }
    }
}