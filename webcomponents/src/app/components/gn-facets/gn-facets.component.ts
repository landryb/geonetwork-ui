import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { SearchFacade } from '@lib/search'
import { BaseComponent } from '../base.component'

@Component({
  selector: 'wc-gn-facets-component',
  templateUrl: './gn-facets.html',
  styleUrls: ['./gn-facets.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GnFacetsComponent extends BaseComponent implements OnInit {
  @Input() facetConfig = '{}'

  constructor(facade: SearchFacade) {
    super(facade)
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.facade.setConfigAggregations(JSON.parse(this.facetConfig))
    this.facade.requestMoreResults()
  }
}
