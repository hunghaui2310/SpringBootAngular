import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart.service';
import {Cart} from '../../../model/cart';

@Component({
  selector: 'app-stepper-input',
  templateUrl: './stepper-input.component.html',
  styleUrls: ['./stepper-input.component.scss']
})
export class StepperInputComponent implements OnInit {

  @Input() initialValue;
  @Input() step = 0;
  @Input() min = 0;
  @Input() max = 0;
  @Input() symbol: string;
  @Input() ariaLabelLess: string;
  @Input() ariaLabelMore: string;
  @Input() productId: number;
  renderedValue: number;
  value = 0;
  currentUser;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.value = this.initialValue
    this.renderedValue = this.value;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value;
      console.log(this.renderedValue);
      this.updateNumCart(this.renderedValue, false);
    }
  }

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value;
      this.updateNumCart(this.renderedValue, true);
    }
  }

  updateNumCart(cartNum: number, click: boolean) {
    const modelCart = new Cart(this.currentUser.id, this.productId, cartNum, click);
    console.log('modelCart', modelCart);
    this.cartService.getAndUpdate(modelCart).subscribe(
      data => {
        this.renderedValue = data['data'];
        console.log('cartNumAfterClick', this.renderedValue);
      }
    );
  }
}
