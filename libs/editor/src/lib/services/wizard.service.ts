import { Injectable } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { IMyMonthLabels } from 'mydatepicker'
import { forkJoin, Observable } from 'rxjs'
import { MONTH_OF_THE_YEAR } from '../components/configs/datepicker.config'
import { WizardFieldModel } from '../models/wizard-field.model'

@Injectable({
  providedIn: 'root',
})
export class WizardService {
  private wizardStep = 1
  private wizardData: Map<string, any> = new Map()

  private id: string
  private storageKey: string
  configuration: WizardFieldModel[][]
  constructor(private translateService: TranslateService) {}

  initialize(
    id: string,
    options: {
      configuration: WizardFieldModel[][]
      storageKey: string
    }
  ): void {
    this.id = id
    const { configuration, storageKey } = options
    this.configuration = configuration
    this.storageKey = storageKey
    this.wizardData.clear()

    this.load()
  }

  getCurrentStep(): number {
    return this.wizardStep
  }

  getStepConfiguration(): WizardFieldModel[] {
    return this.configuration[this.wizardStep - 1]
  }

  getConfiguration(): WizardFieldModel[][] {
    return this.configuration
  }

  getConfigurationStepNumber(): number {
    return this.configuration.length
  }

  getWizardFieldData(fieldId: string) {
    return this.wizardData.get(fieldId)
  }

  onWizardWizardFieldDataChanged(fieldId: string, data: any): void {
    this.setWizardFieldData(fieldId, data)
  }

  setWizardFieldData(fieldId: string, data: any): void {
    this.wizardData.set(fieldId, data)
    this.save()
  }

  save(): void {
    const values = [...this.wizardData].map(([key, value]) => ({
      id: key,
      value,
    }))
    const datafeederState = this.load(false)

    datafeederState[this.id] = {
      step: this.wizardStep,
      values,
    }

    localStorage.setItem(this.storageKey, JSON.stringify(datafeederState))
  }

  onWizardStepChanged(step: number) {
    if (step > 0 && step < this.getConfigurationStepNumber()) {
      this.wizardStep = step
      this.save()
    }
  }

  translateMonthLabels(): Observable<IMyMonthLabels> {
    return new Observable<IMyMonthLabels>((result) => {
      const monthLabels = {}
      const monthTitleObs = []
      MONTH_OF_THE_YEAR.forEach((m) => {
        monthTitleObs.push(this.translateService.get(`datafeeder.month.${m}`))
      })

      forkJoin(monthTitleObs).subscribe((mLabel) => {
        mLabel.forEach((title, index) => (monthLabels[`${index + 1}`] = title))
        result.next(monthLabels)
        result.complete()
      })
    })
  }

  private load(write = true) {
    const lsItem = localStorage.getItem(this.storageKey)
    const datafeederData = lsItem ? JSON.parse(lsItem) : {}
    if (write) {
      datafeederData[this.id]?.values?.forEach((i) => {
        this.wizardData.set(i.id, i.value)
      })
    }
    return datafeederData
  }

  getDataObject() {
    this.load()
    return Object.fromEntries(this.wizardData)
  }
}
