import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ApiCardComponent } from './api-card.component'
import { TranslateModule } from '@ngx-translate/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'

describe('ApiCardComponent', () => {
  let component: ApiCardComponent
  let fixture: ComponentFixture<ApiCardComponent>
  let openRecordApiFormEmit
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApiCardComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardComponent)
    component = fixture.componentInstance
    component.link = {
      accessServiceProtocol: 'ogcFeatures',
    } as DatasetServiceDistribution
    openRecordApiFormEmit = component.openRecordApiForm
    jest.resetAllMocks()
    jest.spyOn(openRecordApiFormEmit, 'emit')
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should initialize custom property based on accessServiceProtocol', () => {
    component.ngOnInit()
    expect(component.displayApiFormButton).toBe(true)
  })

  it('should toggle currentlyActive and emit openRecordApiForm event', () => {
    component.openRecordApiFormPanel()

    expect(component.currentlyActive).toBe(true)
    expect(openRecordApiFormEmit.emit).toHaveBeenCalled()
  })
})
