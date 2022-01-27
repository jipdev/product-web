import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Product } from "../../interfaces/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() loading!: boolean;
  @Input() initialValue!: Product;
  @Output() onSubmit = new EventEmitter<Product>();

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('initialValue' in changes && this.initialValue) {
      this.updateForm();
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      fabrication: [null, Validators.required],
      size: [null, Validators.required],
      price: [null, Validators.required],
    });
  }

  updateForm(): void {
    this.form.patchValue(this.initialValue);
    this.form.updateValueAndValidity();
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.touched && control?.hasError(error));
  }

  backToList(): void {
    this.router.navigateByUrl('/produtos');
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
