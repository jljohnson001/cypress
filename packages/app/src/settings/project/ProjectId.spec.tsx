import { computed, ref } from 'vue'
import { ProjectIdFragmentDoc } from '../../generated/graphql-test'
import ProjectId from './ProjectId.vue'

describe('<ProjectId />', () => {
  beforeEach(() => {
    cy.viewport(1000, 600)
  })

  const copied = ref('')
  const useClipboard = () => ({
    copy: () => {
      copied.value = 'Copied'
    },
    copied,
    text: computed(() => ''),
    isSupported: true,
  })

  it('renders the project ID in the input field', () => {
    const givenProjectId = 'aaaa-bbbb-cccc-dddd'

    cy.mountFragment(ProjectIdFragmentDoc, {
      onResult: (result) => {
        result.projectId = givenProjectId
      },
      render: (gqlVal) => (
        <div class="py-4 px-8">
          <ProjectId
            mockClipboard={useClipboard}
            gql={gqlVal}
          />
        </div>
      ),
    }).then(() => {
      cy.findByText(givenProjectId).should('be.visible')
      cy.findByText('Copy')
    })
  })
})