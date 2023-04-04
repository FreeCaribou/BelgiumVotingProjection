<template>
  <v-row justify="center">
    <v-col cols="12">
      <h1>Voting Repartition (default value with Brussels City for the moment)</h1>
      {{ pending ? 'Loading' : municipalities }}

      <div>
        <v-select
        v-if="!pending"
        label="Select municipality"
        :items="municipalities"
        item-title="label"
        item-value="id"
        return-object
      ></v-select>
      </div>


    </v-col>
    <v-col md="6" sm="12">
      <div class="mx-auto px-2 py-2 mt-2 mx-2">
        <v-card-title>
          Base information for the circonscription
        </v-card-title>
        <v-card-item>
          <v-text-field v-model="numberOfSeat" label="Number of seat" placeholder="49" type="number"
            prepend-icon="mdi:mdi-seat"></v-text-field>
          <v-text-field v-model="totalVote" label="Total vote" placeholder="74049" type="number"
            prepend-icon="mdi:mdi-vote"></v-text-field>
          <v-text-field v-model="whiteVote" label="White vote" placeholder="4139" type="number"
            prepend-icon="mdi:mdi-vote-outline"></v-text-field>

          <v-card variant="tonal" class="px-2 py-2">
            <v-card-title>
              repartition of the vote:
            </v-card-title>
            <v-card-item>
              <v-card v-for="(party, index) in parties" class="mb-2">
                <v-card-item>
                  <v-row>
                    <v-col cols="5">
                      <v-text-field v-model="party.party" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field v-model="party.score" label="Score"></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn icon="mdi:mdi-minus" color="error" size="x-small" @click="deleteParty(index)">
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-card-item>
          </v-card>
        </v-card-item>
        <v-card-actions>
          <v-btn color="primary" @click="addParty">
            Add a party
          </v-btn>
          <v-btn color="success" @click="checkProjection">
            Check
          </v-btn>
        </v-card-actions>
      </div>
    </v-col>

    <v-col md="6" sm="12">
      <v-table>
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
            <td>{{ item.party }}</td>
            <td>{{ item.numberOfSeat }}</td>
            <td>{{ ((item.score / validVote) * 100).toFixed(2) }}</td>
            <td>{{ item.score }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>
<script setup>
  const numberOfSeat = 49;
  const totalVote = 74049;
  const whiteVote = 4139;
  const validVote = 0;

  const parties = [
    { party: 'CDH', score: 6543 },
    { party: 'Ecolo-Groen', score: 11847 },
    { party: 'VB', score: 1138 },
    { party: 'Defi', score: 5137 },
    { party: 'PS', score: 19997 },
    { party: 'MR-VLD', score: 9772 },
    { party: 'NVA', score: 2606 },
    { party: 'PTB-PVDA', score: 8159 },
    { party: 'Change', score: 2269 },
  ];
  const bigArray = [];

const { pending, data: municipalities } = useLazyAsyncData('municipalities', () => $fetch('http://localhost:1979/municipality'));

  watch(municipalities, (newMunicipalities) => {
    console.log('change in municipalities')
  })

function onMunicipalityChange(event) {
    console.log('allll', event)
}


  function checkProjection() {
    let repartitions = [];
    this.bigArray = this.parties;
    let i = 1;
    let isOkay = false;

    this.validVote = this.totalVote - this.whiteVote;

    // stop the count when we say thats ok
    // when the top of max seats is unchanged after one row
    do {
      i++;
      this.bigArray.forEach(e => {
        let scoreOfThisRow = Math.round(e.score / i);

        repartitions.push({
          party: e.party, number: scoreOfThisRow, i
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

    repartitions = repartitions.slice(0, this.numberOfSeat);
    this.bigArray = this.bigArray.map(ba => {
      return { ...ba, numberOfSeat: repartitions.filter(r => r.party === ba.party).length }
    });
  };

  function addParty() {
    this.parties.push({ party: undefined, score: undefined });
  }

  function deleteParty(index) {
    this.parties.splice(index, 1);
  }

</script>
