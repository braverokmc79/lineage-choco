!function(){"use strict";jQuery(document).on("click","a.um-toggle-gdpr",function(e){let t=jQuery(e.currentTarget),g=t.closest(".um-field-area"),o=g.find(".um-gdpr-content");o.is(":visible")?(g.find("a.um-toggle-gdpr").text(t.data("toggle-show")),o.hide().find("a.um-toggle-gdpr").remove(),t.length&&t.get(0).scrollIntoView()):(g.find("a.um-toggle-gdpr").text(t.data("toggle-hide")),o.show().prepend(t.clone()))})}();