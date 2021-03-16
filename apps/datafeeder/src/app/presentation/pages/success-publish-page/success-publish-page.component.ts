import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  DataPublishingApiService,
  DatasetPublishingStatusApiModel,
  PublishJobStatusApiModel,
  PublishStatusEnumApiModel,
} from '@lib/datafeeder-api'
import { Subscription } from 'rxjs'
import { take } from 'rxjs/operators'
import { DatafeederFacade } from '../../../store/datafeeder.facade'

interface DatasetModel extends DatasetPublishingStatusApiModel {
  _links: any
}
export interface JobStatusModel extends PublishJobStatusApiModel {
  jobId?: string
  progress?: number
  status?: PublishStatusEnumApiModel
  error?: string
  datasets: DatasetModel[]
}

@Component({
  selector: 'app-success-publish-page',
  templateUrl: './success-publish-page.component.html',
  styleUrls: ['./success-publish-page.component.css'],
})
export class SuccessPublishPageComponent implements OnInit, OnDestroy {
  subscription: Subscription
  gnLink: string
  gsLink: string

  constructor(private facade: DatafeederFacade, private router: Router) {}

  ngOnInit(): void {
    this.subscription = new Subscription()

    this.subscription.add(
      this.facade.publication$
        .pipe(take(1))
        .subscribe((job: JobStatusModel) => {
          const links = job.datasets[0]._links
          this.gsLink = links.preview.href
          this.gnLink = links.describedBy[1].href
        })
    )
  }

  openGeonetworkLink() {
    window.open(this.gnLink, '_blank')
  }

  openGeoserverLink() {
    window.open(this.gsLink, '_blank')
  }

  backToHome() {
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
