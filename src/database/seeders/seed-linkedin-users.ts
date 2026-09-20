import { MikroORM } from '@mikro-orm/postgresql';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import ormConfig from '../../config/mikro-orm.config';
import { Company } from '../../modules/company/entities/company.entity';
import { CompanySize } from '../../modules/company/entities/company-size.entity';
import { CompanySocialProfileRelation } from '../../modules/company/entities/company-social-profile-relation.entity';
import { Degree } from '../../modules/education/entity/degree.entity';
import { Education } from '../../modules/education/entity/education.entity';
import { EducationDegreeRelation } from '../../modules/education/entity/education-degree-relation.entity';
import { School } from '../../modules/education/entity/school.entity';
import { SchoolType } from '../../modules/education/entity/school-type.entity';
import { StudyField } from '../../modules/education/entity/study-field.entity';
import { StudyFieldRelation } from '../../modules/education/entity/study-field-relation.entity';
import { Industry } from '../../modules/industry/entities/industry.entity';
import { Exprience } from '../../modules/job/entities/exprience.entity';
import { ExprienceLocationNameRelation } from '../../modules/job/entities/exprience-location-name-relation.entity';
import { Job } from '../../modules/job/entities/job.entity';
import { JobLevelRelation } from '../../modules/job/entities/job-level-relation.entity';
import { JobRoleRelation } from '../../modules/job/entities/job-role-relation.entity';
import { Level } from '../../modules/job/entities/level.entity';
import { Role } from '../../modules/job/entities/role.entity';
import { Title } from '../../modules/job/entities/title.entity';
import { Continent } from '../../modules/location/entity/continent.entity';
import { Country } from '../../modules/location/entity/country.entity';
import { County } from '../../modules/location/entity/county.entity';
import { Locality } from '../../modules/location/entity/locality.entity';
import { Location } from '../../modules/location/entity/location.entity';
import { LocationName } from '../../modules/location/entity/location-name.entity';
import { Metro } from '../../modules/location/entity/metro.entity';
import { Region } from '../../modules/location/entity/region.entity';
import { SocialProfile } from '../../modules/social-profile/entities/social-profile.entity';
import { Certificate } from '../../modules/user/entities/certificate.entity';
import { Interest } from '../../modules/user/entities/interest.entity';
import { Language } from '../../modules/user/entities/language.entity';
import { Person } from '../../modules/user/entities/person.entity';
import { PersonCertificateRelation } from '../../modules/user/entities/person-certificate-relation.entity';
import { PersonCountryRelation } from '../../modules/user/entities/person-country-relation.entity';
import { PersonEmail } from '../../modules/user/entities/person-email.entity';
import { PersonInterestRelation } from '../../modules/user/entities/person-interest-relation.entity';
import { PersonLanguageRelation } from '../../modules/user/entities/person-language-relation.entity';
import { PersonLocationNameRelation } from '../../modules/user/entities/person-location-name-relation.entity';
import { PersonPhone } from '../../modules/user/entities/person-phone.entity';
import { PersonSalary } from '../../modules/user/entities/person-salary.entity';
import { PersonSkillRelation } from '../../modules/user/entities/person-skill-relation.entity';
import { PersonSocialProfileRelation } from '../../modules/user/entities/person-social-profile-relation.entity';
import { PersonStreetAddressLocationRelation } from '../../modules/user/entities/person-street-address-location-relation.entity';
import { Skill } from '../../modules/user/entities/skill.entity';

type CsvRow = Record<string, string>;
type Dict = Record<string, unknown>;

function parseCsv(input: string): CsvRow[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = '';
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const next = input[index + 1];
    if (character === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (character === '"') quoted = !quoted;
    else if (character === ',' && !quoted) {
      row.push(value);
      value = '';
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && next === '\n') index += 1;
      row.push(value);
      rows.push(row);
      row = [];
      value = '';
    } else value += character;
  }
  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }
  const headers = rows.shift() ?? [];
  return rows
    .filter((columns) => columns.some((column) => column.trim()))
    .map((columns) =>
      headers.reduce<CsvRow>((record, header, index) => {
        record[header] = columns[index] ?? '';
        return record;
      }, {}),
    );
}

function nullable(value: string | undefined): string | null {
  const normalized = value?.trim();
  return normalized ? normalized.slice(0, 255) : null;
}
function integer(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isInteger(parsed) &&
    parsed >= -2147483648 &&
    parsed <= 2147483647
    ? parsed
    : null;
}
function text(value: unknown): string | null {
  return typeof value === 'string' && value ? value.slice(0, 255) : null;
}
function capped(value: unknown): string | null {
  return text(value)?.slice(0, 255) ?? null;
}
function date(value: unknown, fallback = '1970-01-01'): Date {
  const raw = text(value) ?? fallback;
  // Strip timezone offset (e.g., +054015, +05:40, Z, etc.) from the beginning
  // Match optional sign, one or more digits, and optional colon-separated minutes
  const noTimezone = raw.replace(/^([+-]?\d+)(?:[:\d]+)?/, '');
  const normalized = /^\d{4}$/.test(noTimezone)
    ? `${noTimezone}-01-01`
    : /^\d{4}-\d{2}$/.test(noTimezone)
      ? `${noTimezone}-01`
      : noTimezone;
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime()) ? new Date(fallback) : parsed;
}

class LiteralParser {
  private index = 0;
  constructor(private readonly input: string) {}
  parse(): unknown {
    this.skip();
    return this.value();
  }
  private skip(): void {
    while (/\s/.test(this.input[this.index] ?? '')) this.index += 1;
  }
  private value(): unknown {
    this.skip();
    const character = this.input[this.index];
    if (character === '[') return this.array();
    if (character === '{') return this.object();
    if (character === '"' || character === "'") return this.string();
    const start = this.index;
    while (
      this.index < this.input.length &&
      !/[\s,\]}]/.test(this.input[this.index])
    )
      this.index += 1;
    const token = this.input.slice(start, this.index);
    if (token === 'None') return null;
    if (token === 'True') return true;
    if (token === 'False') return false;
    return Number.isNaN(Number(token)) ? token : Number(token);
  }
  private string(): string {
    const quote = this.input[this.index++];
    let result = '';
    while (this.index < this.input.length) {
      const character = this.input[this.index++];
      if (character === '\\') result += this.input[this.index++] ?? '';
      else if (character === quote) break;
      else result += character;
    }
    return result;
  }
  private array(): unknown[] {
    this.index += 1;
    const result: unknown[] = [];
    while (this.index < this.input.length) {
      this.skip();
      if (this.input[this.index] === ']') {
        this.index += 1;
        break;
      }
      result.push(this.value());
      this.skip();
      if (this.input[this.index] === ',') this.index += 1;
    }
    return result;
  }
  private object(): Dict {
    this.index += 1;
    const result: Dict = {};
    while (this.index < this.input.length) {
      this.skip();
      if (this.input[this.index] === '}') {
        this.index += 1;
        break;
      }
      const key = String(this.value());
      this.skip();
      if (this.input[this.index] === ':') this.index += 1;
      result[key] = this.value();
      this.skip();
      if (this.input[this.index] === ',') this.index += 1;
    }
    return result;
  }
}

function literal(value: string | undefined): unknown {
  const source = nullable(value);
  if (!source) return [];
  try {
    return new LiteralParser(source).parse();
  } catch {
    return [];
  }
}
function list(value: string | undefined): unknown[] {
  const parsed = literal(value);
  return Array.isArray(parsed) ? parsed : [];
}
function strings(value: string | undefined): string[] {
  const parsed = literal(value);
  if (typeof parsed === 'string' && parsed) return [parsed];
  if (!Array.isArray(parsed)) return [];
  return parsed
    .map((item) => (typeof item === 'string' ? item : text(dict(item).name)))
    .filter((item): item is string => Boolean(item));
}
function dict(value: unknown): Dict {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Dict)
    : {};
}

async function findOrCreate(
  em: any,
  entity: any,
  where: any,
  data: any,
): Promise<any> {
  const existing = await em.findOne(entity, where);
  if (existing) return existing;
  const created = em.create(entity, data);
  em.persist(created);
  await em.flush();
  return created;
}
async function relation(
  em: any,
  entity: any,
  data: any,
  where: any,
): Promise<void> {
  if (!(await em.findOne(entity, where))) {
    em.persist(em.create(entity, data));
    await em.flush();
  }
}

async function seedLocation(em: any, data: Dict): Promise<Location | null> {
  const name = text(data.name);
  const regionName = text(data.region);
  const countryName = text(data.country);
  const continentName = text(data.continent);
  if (!name || !regionName || !countryName || !continentName) return null;
  const locationName = await findOrCreate(em, LocationName, { name }, { name });
  const region = await findOrCreate(
    em,
    Region,
    { name: regionName },
    { name: regionName },
  );
  const country = await findOrCreate(
    em,
    Country,
    { name: countryName },
    { name: countryName },
  );
  const continent = await findOrCreate(
    em,
    Continent,
    { name: continentName },
    { name: continentName },
  );
  const localityName = text(data.locality);
  const metroName = text(data.metro);
  const locality = localityName
    ? await findOrCreate(
        em,
        Locality,
        { name: localityName },
        { name: localityName },
      )
    : null;
  const metro = metroName
    ? await findOrCreate(em, Metro, { name: metroName }, { name: metroName })
    : null;
  const county = await findOrCreate(
    em,
    County,
    { name: localityName ?? regionName },
    { name: localityName ?? regionName },
  );
  const geoText = text(data.geo);
  const created = await findOrCreate(
    em,
    Location,
    {
      name: locationName,
      region,
      country,
      streetAddress: text(data.street_address),
    },
    {
      name: locationName,
      locality,
      metro,
      region,
      geo: null,
      county,
      continent,
      country,
      streetAddress: text(data.street_address),
      addressLine2: text(data.address_line_2),
      postalCode: text(data.postal_code),
    },
  );
  if (
    geoText &&
    /^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(geoText) &&
    created.id
  )
    await em
      .getConnection()
      .execute('update locations set geo = ? where id = ?', [
        `(${geoText})`,
        created.id,
      ]);
  return created;
}

async function seedProfile(
  em: any,
  network: string,
  row: Dict,
): Promise<SocialProfile | null> {
  const profile = await findOrCreate(
    em,
    SocialProfile,
    {
      network,
      url: text(row.url),
      userName: text(row.username),
      externalId: text(row.id),
    },
    {
      network,
      url: text(row.url),
      userName: text(row.username),
      externalId: text(row.id),
    },
  );
  return profile;
}

async function seedCompany(em: any, data: Dict): Promise<Company | null> {
  const name = text(data.name);
  if (!name) return null;
  const industryName = text(data.industry);
  const industry = industryName
    ? await findOrCreate(
        em,
        Industry,
        { name: industryName },
        { name: industryName },
      )
    : null;
  const sizeName = text(data.size);
  const size = sizeName
    ? await findOrCreate(
        em,
        CompanySize,
        { size: sizeName },
        { size: sizeName },
      )
    : null;
  const created = await findOrCreate(
    em,
    Company,
    { name, website: text(data.website) },
    {
      name,
      website: text(data.website),
      size,
      founded: integer(data.founded),
      industry,
      location: await seedLocation(em, dict(data.location)),
    },
  );
  const social = await seedProfile(em, 'linkedin', {
    url: data.linkedin_url,
    id: data.linkedin_id,
  });
  if (social)
    await relation(
      em,
      CompanySocialProfileRelation,
      { company: created, profile: social },
      { company: created, profile: social },
    );
  return created;
}

async function seedPersonExtras(
  em: any,
  person: Person,
  row: CsvRow,
): Promise<void> {
  for (const email of list(row.emails)
    .map(dict)
    .map((item) => text(item.address))
    .filter((item): item is string => Boolean(item))) {
    await findOrCreate(
      em,
      PersonEmail,
      { email },
      {
        email,
        person,
        type: 'personal',
      },
    );
  }
  for (const phone of strings(row.phone_numbers)) {
    await findOrCreate(
      em,
      PersonPhone,
      { phone, person },
      {
        phone,
        person,
        type: 'personal',
      },
    );
  }
  for (const interestName of strings(row.interests)) {
    const interest = await findOrCreate(
      em,
      Interest,
      { interest: interestName },
      { interest: interestName },
    );
    await relation(
      em,
      PersonInterestRelation,
      { person, interest },
      { person, interest },
    );
  }
  for (const skillName of strings(row.skills)) {
    const skill = await findOrCreate(
      em,
      Skill,
      { skill: skillName },
      { skill: skillName },
    );
    await relation(
      em,
      PersonSkillRelation,
      { person, skill },
      { person, skill },
    );
  }
  for (const name of strings(row.location_names)) {
    const locationName = await findOrCreate(
      em,
      LocationName,
      { name },
      { name },
    );
    await relation(
      em,
      PersonLocationNameRelation,
      { person, locationName },
      { person, locationName },
    );
  }
  for (const name of strings(row.countries)) {
    const country = await findOrCreate(em, Country, { name }, { name });
    await relation(
      em,
      PersonCountryRelation,
      { person, country },
      { person, country },
    );
  }
  for (const network of ['linkedin', 'facebook', 'twitter', 'github']) {
    const prefix = network;
    const social = await seedProfile(em, network, {
      url: row[`${prefix}_url`],
      username: row[`${prefix}_username`],
      id: row[`${prefix}_id`],
    });
    if (social)
      await relation(
        em,
        PersonSocialProfileRelation,
        { person, profile: social },
        { person, profile: social },
      );
  }
  for (const raw of list(row.street_addresses)) {
    const address = await seedLocation(em, dict(raw));
    if (address)
      await relation(
        em,
        PersonStreetAddressLocationRelation,
        { person, streetAddress: address },
        { person, streetAddress: address },
      );
  }
}

async function seedEducation(
  em: any,
  person: Person,
  value: string,
): Promise<void> {
  for (const raw of list(value)) {
    const item = dict(raw);
    const schoolData = dict(item.school);
    const schoolName = text(schoolData.name);
    let school = null;
    if (schoolName) {
      const typeName = text(schoolData.type);
      const type = typeName
        ? await findOrCreate(
            em,
            SchoolType,
            { name: typeName },
            { name: typeName },
          )
        : null;
      school = await findOrCreate(
        em,
        School,
        { name: schoolName, linkedin_id: text(schoolData.linkedin_id) },
        {
          name: schoolName,
          type,
          linkedin_url: text(schoolData.linkedin_url),
          facebook_url: text(schoolData.facebook_url),
          twitter_url: text(schoolData.twitter_url),
          linkedin_id: text(schoolData.linkedin_id),
          website: text(schoolData.website),
          domain: text(schoolData.domain),
          location: await seedLocation(em, dict(schoolData.location)),
        },
      );
    }
    const education = await findOrCreate(
      em,
      Education,
      {
        person,
        school,
        start_date: text(item.start_date),
        end_date: text(item.end_date),
      },
      {
        person,
        school,
        start_date: text(item.start_date),
        end_date: text(item.end_date),
        gpa: typeof item.gpa === 'number' ? item.gpa : null,
        summary: capped(item.summary),
      },
    );
    for (const name of Array.isArray(item.degrees)
      ? item.degrees.filter(
          (entry): entry is string => typeof entry === 'string',
        )
      : []) {
      const degree = await findOrCreate(em, Degree, { name }, { name });
      await relation(
        em,
        EducationDegreeRelation,
        { education, degree },
        { education, degree },
      );
    }
    for (const name of [
      ...(Array.isArray(item.majors) ? item.majors : []),
      ...(Array.isArray(item.minors) ? item.minors : []),
    ].filter((entry): entry is string => typeof entry === 'string')) {
      const type =
        Array.isArray(item.majors) && item.majors.includes(name)
          ? 'major'
          : 'minor';
      const field = await findOrCreate(
        em,
        StudyField,
        { name, type },
        { name, type },
      );
      await relation(
        em,
        StudyFieldRelation,
        { education, studyField: field, type },
        { education, studyField: field, type },
      );
    }
  }
}

async function seedJobs(em: any, row: CsvRow): Promise<void> {
  const company = await seedCompany(em, {
    name: row.job_company_name,
    website: row.job_company_website,
    size: row.job_company_size,
    founded: row.job_company_founded,
    industry: row.job_company_industry,
    location: {
      name: row.job_company_location_name,
      locality: row.job_company_location_locality,
      metro: row.job_company_location_metro,
      region: row.job_company_location_region,
      country: row.job_company_location_country,
      continent: row.job_company_location_continent,
      geo: row.job_company_location_geo,
      street_address: row.job_company_location_street_address,
      address_line_2: row.job_company_location_address_line_2,
      postal_code: row.job_company_location_postal_code,
    },
    linkedin_url: row.job_company_linkedin_url,
    linkedin_id: row.job_company_linkedin_id,
  });
  const industryName = nullable(row.industry) ?? 'unknown';
  const industry = await findOrCreate(
    em,
    Industry,
    { name: industryName },
    { name: industryName },
  );
  const titleName = nullable(row.job_title);
  const title = titleName
    ? await findOrCreate(em, Title, { name: titleName }, { name: titleName })
    : null;
  if (company && title) {
    const job = await findOrCreate(
      em,
      Job,
      { company, title, industry },
      {
        company,
        title,
        industry,
        summary: capped(row.job_summary),
        last_updated: row.job_last_updated ? date(row.job_last_updated) : null,
        startDate: row.job_start_date ? date(row.job_start_date) : null,
      },
    );
    for (const name of strings(row.job_title_role)) {
      const role = await findOrCreate(em, Role, { role: name }, { role: name });
      await relation(em, JobRoleRelation, { job, role }, { job, role });
    }
    for (const name of strings(row.job_title_levels)) {
      const level = await findOrCreate(
        em,
        Level,
        { level: name },
        { level: name },
      );
      await relation(em, JobLevelRelation, { job, level }, { job, level });
    }
  }
  for (const raw of list(row.experience)) {
    const item = dict(raw);
    const experienceCompany = await seedCompany(em, dict(item.company));
    const titleData = dict(item.title);
    const experienceTitleName = text(titleData.name);
    if (!experienceCompany || !experienceTitleName) continue;
    const experienceTitle = await findOrCreate(
      em,
      Title,
      { name: experienceTitleName },
      { name: experienceTitleName },
    );
    const experience = await findOrCreate(
      em,
      Exprience,
      {
        company: experienceCompany,
        title: experienceTitle,
        startDate: date(item.start_date),
        endDate: date(item.end_date),
      },
      {
        company: experienceCompany,
        title: experienceTitle,
        startDate: date(item.start_date),
        endDate: date(item.end_date),
        is_primary: Boolean(item.is_primary),
        summary: capped(item.summary),
      },
    );
    for (const name of Array.isArray(item.location_names)
      ? item.location_names.filter(
          (entry): entry is string => typeof entry === 'string',
        )
      : []) {
      const locationName = await findOrCreate(
        em,
        LocationName,
        { name },
        { name },
      );
      await relation(
        em,
        ExprienceLocationNameRelation,
        { exprience: experience, locationName },
        { exprience: experience, locationName },
      );
    }
  }
}

async function seed(): Promise<void> {
  const inputPath = resolve(
    process.cwd(),
    'src/database/data/300 user linkedin.txt',
  );
  const rows = parseCsv(readFileSync(inputPath, 'utf8'));
  const orm = await MikroORM.init(ormConfig);
  try {
    const em = orm.em.fork();
    for (const row of rows) {
      const industryName = nullable(row.industry) ?? 'unknown';
      const industry = await findOrCreate(
        em,
        Industry,
        { name: industryName },
        { name: industryName },
      );
      const salary = nullable(row.inferred_salary);
      const inferredSalary = salary
        ? await findOrCreate(em, PersonSalary, { salary }, { salary })
        : null;
      const currentLocation = await seedLocation(em, {
        name: row.location_name,
        locality: row.location_locality,
        metro: row.location_metro,
        region: row.location_region,
        country: row.location_country,
        continent: row.location_continent,
        geo: row.location_geo,
        street_address: row.location_street_address,
        address_line_2: row.location_address_line_2,
        postal_code: row.location_postal_code,
      });
      const person = await findOrCreate(
        em,
        Person,
        {
          fullName: nullable(row.full_name),
          firstName: nullable(row.first_name),
          lastName: nullable(row.last_name),
          industry,
        },
        {
          firstName: nullable(row.first_name),
          lastName: nullable(row.last_name),
          fullName: nullable(row.full_name),
          gender:
            row.gender === 'male'
              ? true
              : row.gender === 'female'
                ? false
                : null,
          middleInitial: nullable(row.middle_initial),
          middleName: nullable(row.middle_name),
          birthYear: integer(row.birth_year),
          birthDate: row.birth_date ? date(row.birth_date) : null,
          linkedinConnections: integer(row.linkedin_connections),
          inferredSalary,
          inferredYearsExperience: integer(row.inferred_years_experience),
          summary: capped(row.summary),
          location: currentLocation,
          workMail: nullable(row.work_email),
          industry,
        },
      );
      await seedPersonExtras(em, person, row);
      await seedEducation(em, person, row.education);
      await seedJobs(em, row);
      for (const name of strings(row.languages)) {
        const language = await findOrCreate(
          em,
          Language,
          { name, proficiency: 'unknown' },
          { name, proficiency: 'unknown' },
        );
        await relation(
          em,
          PersonLanguageRelation,
          { person, language },
          { person, language },
        );
      }
      for (const name of strings(row.certifications)) {
        const certificate = await findOrCreate(
          em,
          Certificate,
          { name, proficiency: 'unknown' },
          { name, proficiency: 'unknown' },
        );
        await relation(
          em,
          PersonCertificateRelation,
          { person, certificate },
          { person, certificate },
        );
      }
    }
    console.log(
      `Seeded all supported fields for ${rows.length} LinkedIn users (version_status excluded).`,
    );
  } finally {
    await orm.close(true);
  }
}

void seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
