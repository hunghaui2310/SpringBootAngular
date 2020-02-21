import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-stepper-input',
  templateUrl: './stepper-input.component.html',
  styleUrls: ['./stepper-input.component.scss']
})
export class StepperInputComponent implements OnInit {

  title = 'Stepper input';
  @Input() initialValue;
  @Input() step = 0;
  @Input() min = 0;
  @Input() max = 0;
  @Input() symbol: string;
  @Input() ariaLabelLess: string;
  @Input() ariaLabelMore: string;
  renderedValue: string;
  value = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.value = this.initialValue
    this.renderedValue = this.value.toString() + this.symbol;
  }

  toggleMore = () => {
    if (this.step + this.value <= this.max) {
      this.value = this.value + this.step;
      this.renderedValue = this.value.toString() + this.symbol;
      console.log(this.renderedValue);
      this.cartService.setNumCart(this.renderedValue);
    }
  }

  toggleLess = () => {
    if (this.value - this.step >= this.min) {
      this.value = this.value - this.step;
      this.renderedValue = this.value.toString() + this.symbol;
      this.cartService.setNumCart(this.renderedValue);
    }
  }
}
