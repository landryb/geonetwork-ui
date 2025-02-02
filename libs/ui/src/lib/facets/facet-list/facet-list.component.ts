import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { EsRequestAggTerm } from '@lib/common'
import { FacetSelectEvent, ModelBlock } from '../facets.model'

@Component({
  selector: 'ui-facet-list',
  templateUrl: './facet-list.component.html',
  styleUrls: ['./facet-list.component.css'],
})
export class FacetListComponent implements OnInit {
  @Input() models: ModelBlock[]
  @Input() selectedPaths: string[][]

  @Output() itemChange = new EventEmitter<FacetSelectEvent>()

  @Output() more = new EventEmitter<string>()
  @Output() filterChange = new EventEmitter<EsRequestAggTerm>()

  constructor() {}

  ngOnInit(): void {}

  getBlockSelectedPaths(model: ModelBlock) {
    return this.selectedPaths.filter((path) => {
      const sPath = JSON.stringify(path)
      const sModelPath = JSON.stringify(model.path)
      const startModelPath = sModelPath.substring(0, sModelPath.length - 1)
      return sPath.startsWith(startModelPath)
    })
  }

  trackByIndexKey(index: number, model: ModelBlock) {
    return model.key
  }

  onItemChange(facetEvent: FacetSelectEvent) {
    this.itemChange.emit(facetEvent)
  }

  onMore(key: string): void {
    this.more.emit(key)
  }

  onFilterChange(field: string, include: string): void {
    this.filterChange.emit({ field, include })
  }
}
