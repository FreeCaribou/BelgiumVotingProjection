<template>
  <div class="row va-gutter-5 justify-center">

    <div class="flex flex-col md12">
      <h1 class="va-h1">Voting Repartition</h1>

      <va-select :options="municipalities" :text-by="(m) => { return `${m.label}${m.priority ? ' | prio' : ''}` }"
        v-model="selectedMunicipality" track-by="id" class="mr-2">
      </va-select>
      <va-select :options="projections" :text-by="(p) => { return `${p.label}${p.official ? ' | official' : ''}` }"
        v-model="selectedProjection" track-by="id" class="mr-2">
        <template v-if="selectedProjection?.official" #append>
          <va-icon name="verified" />
        </template>
      </va-select>
      <va-button icon="add" color="info" @click="onShowAddMunicipalityModal"> Add a municipality </va-button>
      <va-modal v-model="showAddMunicipalityModal" blur>
        <template #content>
          <va-card-content>
            <va-input v-model="newMunicipality" label="Municipality" class="mr-2"></va-input>
            <va-input v-model="newNumberOfSeat" label="Number of seat" type="number" class="mr-2"></va-input>
            <va-checkbox v-model="newPriority" label="Priority ?" class="mr-2"></va-checkbox>
            <va-button color="success" @click="addMunicipality">
              Add
            </va-button>
          </va-card-content>
        </template>
      </va-modal>
    </div>

    <!-- Fill in projection -->
    <div class="flex flex-col md6">
      <va-card>
        <va-card-title>
          Base information for the circonscription
        </va-card-title>
        <va-card-content>
          <va-input v-model="numberOfSeat" label="Number of seat" placeholder="49" type="number" class="mr-3">
            <template #prependInner>
              <va-icon name="event_seat" />
            </template>
          </va-input>
          <va-input v-model="validVotes" label="Valid vote" placeholder="74049" type="number" class="mr-3">
            <template #prependInner>
              <va-icon name="how_to_vote" />
            </template>
          </va-input>
          <va-checkbox v-model="official" label="Official ?"></va-checkbox>
          <br>

          <h4 class="mb-3 mt-3">Repartition of the vote</h4>
          <va-card v-for="(party, index) in parties" class="mb-2">
            <va-card-content>
              <va-input v-model="party.label" label="Name" class="mr-2"></va-input>
              <va-input v-model="party.votes" label="Score" class="mr-2"></va-input>
              <va-button icon="remove" color="danger" size="small" round @click="deleteParty(index)">
              </va-button>
            </va-card-content>
          </va-card>

        </va-card-content>
        <va-card-actions>
          <va-button color="success" @click="checkProjection"> Check </va-button>
          <va-button color="info" @click="addParty"> Add a party </va-button>
          <br>
          <va-input v-model="newProjectionLabel" label="Projection label" class="mr-2"></va-input>
          <va-button color="info" @click="saveProjection"> Save this projection </va-button>
        </va-card-actions>
      </va-card>

    </div>

    <!-- Result of projection -->
    <div class="flex flex-col md6">
      <va-card>
        <va-card-content>
          <table class="va-table va-table--striped">
            <thead>
              <tr>
                <th>Party</th>
                <th>Seats</th>
                <th>%</th>
                <th>Total vote</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bigArray" :key="item.party">
                <td>{{ item.label }}</td>
                <td>{{ item.numberOfSeat }}</td>
                <td>{{ ((item.votes / validVotes) * 100).toFixed(2) }}</td>
                <td>{{ item.votes }}</td>
              </tr>
            </tbody>
          </table>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script setup>

let numberOfSeat = ref(49);
let validVotes = ref(69910);
let official = ref(false);
let parties = ref([
  { label: 'CDH', votes: 6543 },
  { label: 'Ecolo-Groen', votes: 11847 },
  { label: 'VB', votes: 1138 },
  { label: 'Defi', votes: 5137 },
  { label: 'PS', votes: 19997 },
  { label: 'MR-VLD', votes: 9772 },
  { label: 'NVA', votes: 2606 },
  { label: 'PTB-PVDA', votes: 8159 },
  { label: 'Change', votes: 2269 },
]);
let bigArray = ref([]);

const { data: municipalities, refresh } = useLazyAsyncData('municipalities', () => $fetch('http://localhost:1979/municipality'));
let selectedMunicipality = ref();

let projections = ref([]);
let selectedProjection = ref();

let showAddMunicipalityModal = ref(false);
let newMunicipality = ref();
let newNumberOfSeat = ref();
let newPriority = ref(false);

let newProjectionLabel = ref();

function fetchProjections() {
  $fetch(`http://localhost:1979/projection/municipality/${selectedMunicipality.value.id}`).then(data => {
    console.log('fetch projections', data, selectedMunicipality.value)
    projections.value = data;
    numberOfSeat.value = selectedMunicipality.value.totalSeats;
  });
}

watch(municipalities, (newMunicipalities) => {
  console.log('change in municipalities', newMunicipalities)
  selectedMunicipality.value = newMunicipalities.length > 0 ? newMunicipalities[0] : null;
});

watch(selectedMunicipality, (newSelectedMunicipality) => {
  console.log('change in selectedMunicipality', newSelectedMunicipality)
  if (newSelectedMunicipality) {
    fetchProjections();
  }
});

watch(projections, (newProjections) => {
  console.log('change in projections', newProjections)
  selectedProjection.value = newProjections[newProjections.length - 1];
});

watch(selectedProjection, (newSelectedProjection) => {
  console.log('change in selectedProjection', newSelectedProjection)
  if (newSelectedProjection) {
    $fetch(`http://localhost:1979/projection/${newSelectedProjection.id}`).then(data => {
    console.log('new projection selected', data)
    parties.value = data.parties;
    validVotes.value = data.validVotes;
    official.value = data.official;
    checkProjection();
  });
  }
});

function checkProjection() {
  let repartitions = [];
  bigArray.value = parties.value;
  let i = 1;
  let isOkay = false;

  // stop the count when we say thats ok
  // when the top of max seats is unchanged after one row
  do {
    i++;
    bigArray.value.forEach(e => {
      let scoreOfThisRow = Math.round(e.votes / i);

      repartitions.push({
        label: e.label, number: scoreOfThisRow, i
      });
    });
    isOkay = i === 100;
  } while (!isOkay)

  repartitions.sort((a, b) => {
    if (a.number <= b.number) {
      return 1;
    } else {
      return -1;
    }
  });

  repartitions = repartitions.slice(0, numberOfSeat.value);
  bigArray.value = bigArray.value.map(ba => {
    return { ...ba, numberOfSeat: repartitions.filter(r => r.label === ba.label).length }
  });
};

function addParty() {
  parties.value.push({ label: undefined, votes: undefined });
}

function deleteParty(index) {
  parties.value.splice(index, 1);
}

function onShowAddMunicipalityModal() {
  showAddMunicipalityModal.value = true;
}

function addMunicipality() {
  console.log('add municipality', newMunicipality, newNumberOfSeat)
  showAddMunicipalityModal.value = false;

  $fetch(`http://localhost:1979/municipality`, {
    method: 'POST',
    body: {
      label: newMunicipality.value,
      totalSeats: newNumberOfSeat.value,
      priority: newPriority.value,
    }
  }).finally(() => {
    newMunicipality.value = null;
    newNumberOfSeat.value = null;
    newPriority.value = false;
    refresh();
  });
}

function saveProjection() {
  console.log('and the party ?', parties.value)
  $fetch(`http://localhost:1979/projection`, {
    method: 'POST',
    body: {
      label: newProjectionLabel.value,
      official: official.value,
      validVotes: validVotes.value,
      municipality: { id: selectedMunicipality.value.id },
      parties: parties.value.map(p => {return {label: p.label, votes: parseInt(p.votes)}})
    }
  }).finally(() => {
    newProjectionLabel.value = null;
    fetchProjections();
  });
}

</script>
