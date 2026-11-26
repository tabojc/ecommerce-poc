import { addToCart, getCart, removeFromCart } from '../lib/cart';

class CartDrawer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  connectedCallback() {
    this.addEventListener('cart:update', () => this.render());
    window.addEventListener('cart:update', () => this.render());
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
    window.removeEventListener('cart:update', () => this.render());
  }

  private handleClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const addBtn = target.closest('[data-add-to-cart]');
    if (addBtn) {
      const productId = Number(addBtn.getAttribute('data-add-to-cart'));
      addToCart(productId, 1);
    }
    const removeBtn = target.closest('[data-remove-from-cart]');
    if (removeBtn) {
      const productId = Number(removeBtn.getAttribute('data-remove-from-cart'));
      removeFromCart(productId);
    }
  };

  private render() {
    const items = getCart();
    this.shadowRoot!.innerHTML = `
      <div class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-50" data-close></div>
        <div class="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 class="text-xl font-bold mb-4">Tu carrito</h2>
          <div class="space-y-4 max-h-96 overflow-y-auto">
            ${items.length === 0 ? '<p class="text-gray-500">Tu carrito está vacío</p>' : items.map(item => `
              <div class="flex items-center justify-between border-b pb-2">
                <span class="text-gray-700">Producto ${item.productId}</span>
                <div class="flex items-center space-x-2">
                  <button data-remove-from-cart="${item.productId}" class="text-red-500 hover:text-red-700">✕</button>
                </div>
              </div>
            `).join('')}
          </div>
          <button data-close class="mt-4 w-full bg-brand-600 text-white py-2 rounded hover:bg-brand-700">Checkout</button>
        </div>
      </div>
    `;

    const close = this.shadowRoot?.querySelector('[data-close]');
    const checkout = this.shadowRoot?.querySelector('[data-close]')?.parentElement?.querySelector('button');
    close?.addEventListener('click', () => this.remove());
    checkout?.addEventListener('click', () => {
      // TODO: go to checkout
      this.remove();
    });
  }

  private remove() {
    // TODO: remove drawer
  }
}

if (typeof window !== 'undefined') {
  customElements.define('cart-drawer', CartDrawer);
}

export {};
