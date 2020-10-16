import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { Meta, Story } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'

export default {
  title: 'UI/Record preview',
  component: RecordPreviewListComponent,
  decorators: [withKnobs, withA11y],
} as Meta

const Template: Story<RecordPreviewListComponent> = (args) => ({
  component: RecordPreviewListComponent,
  props: args,
})

export const RecordPreviewListComponentStory = Template.bind({})

RecordPreviewListComponentStory.args = {
  record: {
    uuid: 'uiiudiiddeaafdjsqmlkfdq',
    title: 'A very nice record',
    thumbnailUrl:
      'https://sextant.ifremer.fr/var/storage/images/_aliases/listitem_thumbnail/medias-ifremer/medias-sextant/accueil/cartes-thematiques/adcp/1595636-3-fre-FR/ADCP.png',
    abstract:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dapibus euismod libero, eu ullamcorper nisl placerat sit amet. Nulla vel sapien odio. Integer convallis scelerisque lorem, eget ultricies elit ultrices sit amet. Mauris nunc felis, vulputate laoreet lacinia et, volutpat et ligula. Sed a magna et augue convallis pretium. Fusce euismod dui in sapien tincidunt aliquet. Curabitur porttitor mauris a bibendum eleifend.',
    url: 'www.goto.com',
  },
}

RecordPreviewListComponentStory.storyName = 'List record'