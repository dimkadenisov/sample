"use strict";

var burgerButton = document.querySelector('.burger-button');

var toggleBurgerMenu = function toggleBurgerMenu() {
  burgerButton.classList.toggle('burger-button_opened');
  document.body.classList.toggle('overflow_hidden');
  burgerButton.parentNode.querySelector('.burger-menu').classList.toggle('burger-menu_opened');
  burgerButton.parentNode.querySelector('.overlay').classList.toggle('d_none');

  if (burgerButton.classList.contains('burger-button_opened')) {
    window.addEventListener('resize', toggleBurgerMenuOnResize);
  } else {
    window.removeEventListener('resize', toggleBurgerMenuOnResize);
  }
};

burgerButton.addEventListener('click', toggleBurgerMenu);
document.querySelector('.burger-clickaway-listener').addEventListener('click', toggleBurgerMenu);

var toggleBurgerMenuTransition = function toggleBurgerMenuTransition() {
  if (window.matchMedia('(max-width: 767px)').matches) {
    document.querySelector('.burger-menu').classList.add('burger-menu_transition');
  } else {
    document.querySelector('.burger-menu').classList.remove('burger-menu_transition');
  }
};

toggleBurgerMenuTransition();
window.addEventListener('resize', toggleBurgerMenuTransition);
window.addEventListener('orientationchange', function () {
  if (burgerButton.classList.contains('burger-button_opened') && Math.abs(window.orientation) === 90 && screen.availHeight > 767) {
    burgerButton.classList.remove('burger-button_opened');
    document.body.classList.remove('overflow_hidden');
    document.querySelector('.burger-menu_opened').classList.remove('burger-menu_opened');
    burgerButton.parentNode.querySelector('.overlay').classList.add('d_none');
  }
});

function toggleBurgerMenuOnResize() {
  if (window.matchMedia('(min-width: 768px)').matches && burgerButton.classList.contains('burger-button_opened')) {
    burgerButton.classList.remove('burger-button_opened');
    document.body.classList.remove('overflow_hidden');
    burgerButton.parentNode.querySelector('.burger-menu').classList.remove('burger-menu_opened');
    burgerButton.parentNode.querySelector('.overlay').classList.add('d_none');
  }
}
"use strict";

var collapseHeadings = document.querySelectorAll('.collapse-heading');
collapseHeadings.forEach(function (heading) {
  heading.addEventListener('click', function () {
    var collapse = this.closest('.collapse');
    collapse.classList.toggle('collapse_opened');
    var isCollapseOpened = collapse.classList.contains('collapse_opened');
    var height = isCollapseOpened ? collapse.querySelectorAll('.collapse__inner > *').reduce(function (acc, node) {
      return acc + node.offsetHeight;
    }, 0) : 0;
    collapse.querySelector('.collapse__inner').style.maxHeight = "".concat(height, "px");
  });
});
"use strict";

document.addEventListener('scroll', function () {
  if (document.querySelector('.header:not([data-disabled])')) {
    window.pageYOffset > 1 ? document.querySelector('.header:not([data-disabled])').classList.add('header_scrolled') : document.querySelector('.header:not([data-disabled])').classList.remove('header_scrolled');
  }
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var initPoppers = function initPoppers() {
  document.querySelectorAll('.icon-button').forEach(function (button) {
    if (button.nextElementSibling && button.nextElementSibling.classList.contains('icon-button-menu') && window.matchMedia('(min-width: 768px)').matches) {
      Popper.createPopper(button, button.nextElementSibling, {
        placement: 'bottom-end',
        strategy: 'fixed',
        modifiers: [{
          name: 'offset',
          options: {
            offset: [10, 18]
          }
        }, {
          name: 'arrow'
        }]
      });
      button.addEventListener('click', function (event) {
        if (window.matchMedia('(min-width: 768px)').matches) {
          event.preventDefault();

          if (this.nextElementSibling.classList.contains('visibility_hidden')) {
            this.closest('.icon-buttons-list').querySelectorAll('.icon-button-menu').forEach(function (item) {
              item.classList.add('visibility_hidden');
            });
            this.nextElementSibling.classList.remove('visibility_hidden');
            event.stopPropagation();
            document.addEventListener('click', handleIconButtonClickAway(button.nextElementSibling));
          } else {
            this.nextElementSibling.classList.add('visibility_hidden');
            document.removeEventListener('click', handleIconButtonClickAway(button.nextElementSibling));
          }
        }
      });
    }
  });
};

initPoppers();

function handleIconButtonClickAway(menu) {
  return function (event) {
    if (menu.isEqualNode(event.target.closest('.icon-button-menu'))) return;
    menu.classList.add('visibility_hidden');
  };
}

window.addEventListener('resize', function () {
  if (window.matchMedia('(min-width: 768px)').matches && _toConsumableArray(document.querySelectorAll('.icon-button-menu')).some(function (item) {
    return !item.hasAttribute('data-popper-placement');
  })) {
    initPoppers();
  }

  if (window.matchMedia('(max-width: 767px)').matches) {
    document.querySelectorAll('.icon-button-menu').forEach(function (item) {
      item.classList.add('visibility_hidden');
    });
  }
});
"use strict";

var handleSelectMouseEnter = function handleSelectMouseEnter(event) {
  this.classList.add('language-select_opened');
};

var handleSelectMouseLeave = function handleSelectMouseLeave(event) {
  this.classList.remove('language-select_opened');
};

document.querySelectorAll('.language-select').forEach(function (select) {
  select.addEventListener('mouseenter', handleSelectMouseEnter);
  select.addEventListener('mouseleave', handleSelectMouseLeave);
});
document.querySelectorAll('.language').forEach(function (language) {
  language.addEventListener('click', function (event) {
    if (language.closest('.language-list')) {
      var appendTarget = language.parentNode;
      var select = language.closest('.language-select');
      var oldLanguage = select.querySelector('.language-select__current .language');
      oldLanguage.parentNode.appendChild(language);
      appendTarget.appendChild(oldLanguage);
      select.classList.remove('language-select_opened');
      select.removeEventListener('mouseenter', handleSelectMouseEnter);
      setTimeout(function () {
        select.addEventListener('mouseenter', handleSelectMouseEnter);
      }, 200);
    }
  });
});
"use strict";

window.matchMedia('(max-width: 767px)') && document.querySelector('.ready-product') && (document.querySelector('.ready-product').innerText = 'Готовые продукты');
var mediaQuery = window.matchMedia('(max-width: 767px)');
document.querySelector('.ready-product') && mediaQuery.addListener(function (e) {
  document.querySelector('.ready-product').innerText = e.matches ? 'Готовые продукты' : 'Посмотреть готовые продукты';
});
"use strict";

document.addEventListener('click', function (event) {
  var card = event.target.closest('.service-card');

  if (card && !event.target.closest('a') && !event.target.closest('button')) {
    card.classList.toggle('service-card_opened');
    card.querySelector('.products-block').classList.toggle('products-block_column');
    card.querySelectorAll('.products-list').forEach(function (list) {
      list.classList.toggle('visually-hidden');
    });
    card.querySelectorAll('.products-group').forEach(function (group) {
      group.classList.toggle('products-group_opened');
    });
    card.querySelector('.buttons-group').classList.toggle('visually-hidden');
  }
});
"use strict";

var columns = document.querySelectorAll('.services-list__column');

var replaceCardsFromDesktop = function replaceCardsFromDesktop() {
  if (columns.length) {
    if (window.matchMedia('(max-width: 1169px) and (min-width: 768px)').matches) {
      columns[2].querySelectorAll('.services-list__item').forEach(function (node, index) {
        index % 2 === 0 ? columns[0].appendChild(node) : columns[1].appendChild(node);
      });
    }

    if (window.matchMedia('(max-width: 789px)').matches) {
      columns[1].querySelectorAll('.services-list__item').forEach(function (node) {
        return columns[0].appendChild(node);
      });
      columns[2].querySelectorAll('.services-list__item').forEach(function (node) {
        return columns[0].appendChild(node);
      });
    }
  }
};

var replaceCardsFromMobile = function replaceCardsFromMobile() {
  if (columns.length) {
    if (window.matchMedia('(min-width: 1170px)').matches) {
      document.querySelectorAll('.services-list__item[data-column="1"]').forEach(function (node) {
        return columns[1].appendChild(node);
      });
      document.querySelectorAll('.services-list__item[data-column="2"]').forEach(function (node) {
        return columns[2].appendChild(node);
      });
    }

    if (window.matchMedia('(max-width: 1169px) and (min-width: 768px)').matches) {
      document.querySelectorAll('.services-list__item[data-column="1"]').forEach(function (node) {
        return columns[1].appendChild(node);
      });
      document.querySelectorAll('.services-list__item[data-column="2"]').forEach(function (node, index) {
        index % 2 === 0 ? columns[0].appendChild(node) : columns[1].appendChild(node);
      });
    }
  }
};

replaceCardsFromDesktop();
replaceCardsFromMobile();
window.addEventListener('resize', function () {
  replaceCardsFromDesktop();
  replaceCardsFromMobile();
});
// function addSidebarToBurgerMenu() {
// 	if (
// 		document.querySelector('.sidebar') &&
// 		document.querySelector('.sidebar > .sidebar__inner') &&
// 		window.matchMedia('(max-width: 991px)').matches
// 	) {
// 		document
// 			.querySelector('.burger-menu')
// 			.appendChild(document.querySelector('.sidebar__inner'));
// 	}
// }
// function removeSidebarToBurgerMenu() {
// 	if (
// 		window.matchMedia('(min-width: 992px)').matches &&
// 		document.querySelector('.sidebar') &&
// 		document.querySelector('.burger-menu > .sidebar__inner')
// 	) {
// 		document
// 			.querySelector('.sidebar')
// 			.appendChild(document.querySelector('.sidebar__inner'));
// 	}
// }
// window.addEventListener('resize', () => {
// 	addSidebarToBurgerMenu();
// 	removeSidebarToBurgerMenu();
// });
// addSidebarToBurgerMenu();
// removeSidebarToBurgerMenu();
"use strict";
"use strict";

document.querySelectorAll('.switch').forEach(function (item) {
  if (item.nextElementSibling.classList.contains('switch-tab')) {
    item.querySelector('.switch__input').addEventListener('click', function (e) {
      item.parentNode.querySelectorAll('.switch-tab').forEach(function (tab) {
        tab.classList.toggle('d_none');
      });
    });
  }
});