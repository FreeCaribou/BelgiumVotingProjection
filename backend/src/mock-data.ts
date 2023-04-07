import { DataSource } from "typeorm";
import { appDataSourceConfig } from "./data-source";
import { Municipality, ProvinceEnum } from "./projections/entities/municipality.entity";
import { Party } from "./projections/entities/party.entity";
import { Projection } from "./projections/entities/projection.entity";

export async function mockData() {
    const repo = await new DataSource(appDataSourceConfig()).initialize();
    await repo.dropDatabase();
    // we need to recall it to have again the table after the clean up
    await new DataSource(appDataSourceConfig()).initialize();

    const municipalities = await mockMunicipality(repo);
    const projections = await mockProjection(repo, municipalities);
    await mockParty(repo, projections);
}

async function mockMunicipality(repo) {
    const municipalityRepo = repo.getRepository(Municipality);
    return [
        await municipalityRepo.save(await municipalityRepo.create(
            { label: 'Bruxelles-Villes', totalSeats: 49, province: ProvinceEnum.BBW }
        )),
        await municipalityRepo.save(await municipalityRepo.create(
            { label: 'Saint-Gilles', totalSeats: 35, province: ProvinceEnum.BBW }
        )),
        await municipalityRepo.save(await municipalityRepo.create(
            { label: 'Molenbeek', totalSeats: 45, province: ProvinceEnum.BBW }
        )),
    ];
}

async function mockProjection(repo, municipalities: Municipality[]) {
    const projectionRepo = repo.getRepository(Projection);
    return [
        await projectionRepo.save(await projectionRepo.create(
            { official: true, date: new Date('2018-10-14'), validVotes: 70467, municipality: municipalities[0], label: 'Official 2018' }
        )),
        await projectionRepo.save(await projectionRepo.create(
            { official: false, date: new Date('2023-01-01'), validVotes: 70467, municipality: municipalities[0], label: 'Steal to right' }
        )),
        await projectionRepo.save(await projectionRepo.create(
            { official: false, date: new Date('2023-01-01'), validVotes: 70467, municipality: municipalities[1], label: 'Fantasy' }
        )),
    ]
}

async function mockParty(repo, projections: Projection[]) {
    const partyRepo = repo.getRepository(Party);
    return [
        // For the first projection of Brussels, real data
        await partyRepo.save(await partyRepo.create(
            { label: 'PTB', votes: 8159, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'CDH', votes: 6543, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'VB', votes: 1138, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Ecolo-Groen', votes: 11847, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Defi', votes: 5137, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'PS', votes: 19997, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'MR', votes: 9772, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'NVA', votes: 2606, projection: projections[0] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Change', votes: 2269, projection: projections[0] }
        )),

        // For a projection of Brussels, fake
        await partyRepo.save(await partyRepo.create(
            { label: 'PTB', votes: 10159, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'CDH', votes: 5543, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'VB', votes: 1138, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Ecolo-Groen', votes: 8847, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Defi', votes: 5137, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'PS', votes: 20997, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'MR', votes: 7772, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'NVA', votes: 3606, projection: projections[1] }
        )),
        await partyRepo.save(await partyRepo.create(
            { label: 'Agora', votes: 4269, projection: projections[1] }
        )),
    ]
}