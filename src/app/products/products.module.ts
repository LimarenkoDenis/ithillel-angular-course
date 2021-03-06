import { EffectsModule } from '@ngrx/effects';
import { ChildGuard } from './../shared/services/child.guard';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './products.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { UiModule } from '../ui/ui.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { RouterModule } from '@angular/router';
import { RaitingComponent } from './product-detail/raiting/raiting.component';
import { ProductsEffects } from './state/effects/products.effects';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    HttpClientModule,
    EffectsModule.forFeature([ProductsEffects]),
    RouterModule.forChild([
      { path: '', component: ProductsComponent },
      {
        path: ':productId', component: ProductDetailComponent, children: [
          { 
            path: 'feedbacks', 
            canLoad: [ChildGuard], 
            loadChildren: './product-detail/feedbacks/feedbacks.module#FeedbacksModule' 
          },
          { path: 'raiting', component: RaitingComponent }
        ]
      },
    ])
  ],
  declarations: [ProductsComponent, ProductDetailComponent, RaitingComponent],
  providers: [ProductsService],
})
export class ProductsModule { }
