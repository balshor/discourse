import DropdownSelectBoxComponent from "discourse/components/dropdown-select-box";
import { iconHTML } from "discourse-common/lib/icon-library";
import computed from "ember-addons/ember-computed-decorators";
import { buttonDetails } from "discourse/lib/notification-levels";
import { allLevels } from "discourse/lib/notification-levels";

export default DropdownSelectBoxComponent.extend({
  classNames: ["notifications-button"],

  i18nPrefix: "",
  i18nPostfix: "",
  textKey: "key",
  showFullTitle: true,
  fullWidthOnMobile: true,
  content: allLevels,

  value: Em.computed.alias("notificationLevel"),

  @computed("value")
  icon(value) {
    const details = buttonDetails(value);
    return iconHTML(details.icon, {class: details.key}).htmlSafe();
  },

  @computed("value", "showFullTitle")
  generatedHeadertext(value, showFullTitle) {
    if (showFullTitle) {
      const details = buttonDetails(value);
      return I18n.t(`${this.get("i18nPrefix")}.${details.key}.title`);
    } else {
      return null;
    }
  },

  @computed
  titleForRow: function() {
    return (rowComponent) => {
      const notificationLevel = rowComponent.get(`content.${this.get("idKey")}`);
      const details = buttonDetails(notificationLevel);
      return I18n.t(`${this.get("i18nPrefix")}.${details.key}.title`);
    };
  },

  @computed
  templateForRow: function() {
    return (rowComponent) => {
      const content = rowComponent.get("content");
      const start = `${this.get("i18nPrefix")}.${content.key}${this.get("i18nPostfix")}`;
      const title = I18n.t(`${start}.title`);
      const description = I18n.t(`${start}.description`);

      return `
        <div class="icons">
          <span class="selection-indicator"></span>
          ${iconHTML(content.icon, { class: content.key.dasherize() })}
        </div>
        <div class="texts">
          <span class="title">${Handlebars.escapeExpression(title)}</span>
          <span class="desc">${Handlebars.escapeExpression(description)}</span>
        </div>
      `;
    };
  }
});
