import { Migration } from '@mikro-orm/migrations';

export class Migration20260907151405 extends Migration {

  name = 'Migration20260907151405';

  override up(): void | Promise<void> {
    this.addSql(`create table "company_sizes" ("id" serial primary key, "size" varchar(255) null);`);

    this.addSql(`create table "continents" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "countries" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "counties" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "degrees" ("id" serial primary key, "name" varchar(255) not null);`);
    this.addSql(`alter table "degrees" add constraint "degrees_name_unique" unique ("name");`);

    this.addSql(`create table "industries" ("id" serial primary key, "name" varchar(255) null);`);
    this.addSql(`alter table "industries" add constraint "industries_name_unique" unique ("name");`);

    this.addSql(`create table "interests" ("id" serial primary key, "interest" varchar(255) null);`);

    this.addSql(`create table "job_roles" ("id" serial primary key, "role" varchar(255) null);`);

    this.addSql(`create table "languages" ("id" serial primary key, "name" varchar(255) not null, "proficiency" varchar(255) not null);`);
    this.addSql(`alter table "languages" add constraint "languages_name_proficiency_unique" unique ("name", "proficiency");`);

    this.addSql(`create table "levels" ("id" serial primary key, "level" varchar(255) null);`);

    this.addSql(`create table "localities" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "location_names" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "metros" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "person_certificates" ("id" serial primary key, "name" varchar(255) not null, "proficiency" varchar(255) not null);`);
    this.addSql(`alter table "person_certificates" add constraint "person_certificates_name_proficiency_unique" unique ("name", "proficiency");`);

    this.addSql(`create table "person_emails" ("id" serial primary key, "email" varchar(255) not null);`);

    this.addSql(`create table "person_phones" ("id" serial primary key, "phone" varchar(255) null);`);

    this.addSql(`create table "person_salaries" ("id" serial primary key, "salary" varchar(255) not null);`);

    this.addSql(`create table "regions" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "locations" ("id" serial primary key, "name_id" int not null, "locality_id" int null, "metro_id" int null, "region_id" int not null, "geo" point null, "county_id" int not null, "continent_id" int not null, "country_id" int not null, "street_address" varchar(255) null, "address_line2" varchar(255) null, "postal_code" varchar(255) null);`);

    this.addSql(`create table "people" ("id" serial primary key, "first_name" varchar(255) null, "last_name" varchar(255) null, "full_name" varchar(255) null, "gender" boolean null, "middle_initial" varchar(255) null, "middle_name" varchar(255) null, "birth_year" int null, "birth_date" date null, "linkedin_connections" int null, "inferred_salary_id" int null, "inferred_years_experience" int null, "summary" varchar(255) null, "location_id" int null, "work_mail" varchar(255) null, "industry_id" int not null);`);

    this.addSql(`create table "person_street_address_location_relation" ("id" serial primary key, "person_id" int not null, "street_address_id" int not null);`);
    this.addSql(`alter table "person_street_address_location_relation" add constraint "person_street_address_location_relation_person_id_cb380_unique" unique ("person_id", "street_address_id");`);

    this.addSql(`create table "person_location_name_relation" ("id" serial primary key, "person_id" int not null, "location_name_id" int not null);`);
    this.addSql(`alter table "person_location_name_relation" add constraint "person_location_name_relation_person_id_location_name_id_unique" unique ("person_id", "location_name_id");`);

    this.addSql(`create table "person_languages_relation" ("id" serial primary key, "person_id" int not null, "language_id" int not null);`);
    this.addSql(`alter table "person_languages_relation" add constraint "person_languages_relation_person_id_language_id_unique" unique ("person_id", "language_id");`);

    this.addSql(`create table "person_interests_relation" ("id" serial primary key, "person_id" int not null, "interest_id" int not null);`);
    this.addSql(`alter table "person_interests_relation" add constraint "person_interests_relation_person_id_interest_id_unique" unique ("person_id", "interest_id");`);

    this.addSql(`create table "person_countries_relation" ("id" serial primary key, "person_id" int not null, "country_id" int not null);`);
    this.addSql(`alter table "person_countries_relation" add constraint "person_countries_relation_person_id_country_id_unique" unique ("person_id", "country_id");`);

    this.addSql(`create table "person_certificate_relation" ("id" serial primary key, "person_id" int not null, "certificate_id" int not null);`);
    this.addSql(`alter table "person_certificate_relation" add constraint "person_certificate_relation_person_id_certificate_id_unique" unique ("person_id", "certificate_id");`);

    this.addSql(`create table "companies" ("id" serial primary key, "name" varchar(255) null, "website" varchar(255) null, "size_id" int null, "founded" int null, "industry_id" int null, "location_id" int null);`);

    this.addSql(`create table "school_types" ("id" serial primary key, "name" varchar(255) not null);`);
    this.addSql(`alter table "school_types" add constraint "school_types_name_unique" unique ("name");`);

    this.addSql(`create table "schools" ("id" serial primary key, "name" varchar(255) not null, "type_id" int null, "linkedin_url" varchar(255) null, "facebook_url" varchar(255) null, "twitter_url" varchar(255) null, "linkedin_id" varchar(255) null, "website" varchar(255) null, "domain" varchar(255) null, "location_id" int null);`);

    this.addSql(`create table "educations" ("id" serial primary key, "person_id" int not null, "school_id" int null, "start_date" varchar(255) null, "end_date" varchar(255) null, "gpa" real null, "summary" varchar(255) null);`);

    this.addSql(`create table "education_degrees_relation" ("id" serial primary key, "education_id" int not null, "degree_id" int not null);`);
    this.addSql(`alter table "education_degrees_relation" add constraint "education_degrees_relation_education_id_degree_id_unique" unique ("education_id", "degree_id");`);

    this.addSql(`create table "skills" ("id" serial primary key, "skill" varchar(255) null);`);

    this.addSql(`create table "person_skill_relation" ("id" serial primary key, "person_id" int not null, "skill_id" int not null);`);
    this.addSql(`alter table "person_skill_relation" add constraint "person_skill_relation_person_id_skill_id_unique" unique ("person_id", "skill_id");`);

    this.addSql(`create table "social_profiles" ("id" serial primary key, "network" varchar(255) not null, "url" varchar(255) null, "user_name" varchar(255) null, "external_id" varchar(255) null);`);

    this.addSql(`create table "person_social_profiles_relation" ("id" serial primary key, "person_id" int not null, "profile_id" int not null);`);
    this.addSql(`alter table "person_social_profiles_relation" add constraint "person_social_profiles_relation_person_id_profile_id_unique" unique ("person_id", "profile_id");`);

    this.addSql(`create table "company_social_profiles_relation" ("id" serial primary key, "company_id" int not null, "profile_id" int not null);`);
    this.addSql(`alter table "company_social_profiles_relation" add constraint "company_social_profiles_relation_company_id_profile_id_unique" unique ("company_id", "profile_id");`);

    this.addSql(`create table "study_fields" ("id" serial primary key, "name" varchar(255) not null, "type" varchar(255) not null);`);
    this.addSql(`alter table "study_fields" add constraint "study_fields_name_type_unique" unique ("name", "type");`);

    this.addSql(`create table "education_study_fields_relation" ("id" serial primary key, "education_id" int not null, "study_field_id" int not null, "type" varchar(255) not null);`);
    this.addSql(`alter table "education_study_fields_relation" add constraint "education_study_fields_relation_education_id_stud_bd0de_unique" unique ("education_id", "study_field_id", "type");`);

    this.addSql(`create table "titles" ("id" serial primary key, "name" varchar(255) null);`);

    this.addSql(`create table "jobs" ("id" serial primary key, "industry_id" int not null, "summary" varchar(255) null, "title_id" int not null, "company_id" int not null, "last_updated" date null, "start_date" date null);`);

    this.addSql(`create table "job_role_relation" ("id" serial primary key, "job_id" int not null, "role_id" int not null);`);

    this.addSql(`create table "job_level_relation" ("id" serial primary key, "job_id" int not null, "level_id" int not null);`);

    this.addSql(`create table "expriences" ("id" serial primary key, "company_id" int not null, "end_date" date not null, "start_date" date not null, "title_id" int not null, "is_primary" boolean not null, "summary" varchar(255) null);`);

    this.addSql(`create table "exprience_location_name_relation" ("id" serial primary key, "exprience_id" int not null, "location_name_id" int not null);`);
    this.addSql(`alter table "exprience_location_name_relation" add constraint "exprience_location_name_relation_exprience_id_loc_87313_unique" unique ("exprience_id", "location_name_id");`);

    this.addSql(`alter table "locations" add constraint "locations_name_id_foreign" foreign key ("name_id") references "location_names" ("id");`);
    this.addSql(`alter table "locations" add constraint "locations_locality_id_foreign" foreign key ("locality_id") references "localities" ("id") on delete set null;`);
    this.addSql(`alter table "locations" add constraint "locations_metro_id_foreign" foreign key ("metro_id") references "metros" ("id") on delete set null;`);
    this.addSql(`alter table "locations" add constraint "locations_region_id_foreign" foreign key ("region_id") references "regions" ("id");`);
    this.addSql(`alter table "locations" add constraint "locations_county_id_foreign" foreign key ("county_id") references "counties" ("id");`);
    this.addSql(`alter table "locations" add constraint "locations_continent_id_foreign" foreign key ("continent_id") references "continents" ("id");`);
    this.addSql(`alter table "locations" add constraint "locations_country_id_foreign" foreign key ("country_id") references "countries" ("id");`);

    this.addSql(`alter table "people" add constraint "people_inferred_salary_id_foreign" foreign key ("inferred_salary_id") references "person_salaries" ("id") on delete set null;`);
    this.addSql(`alter table "people" add constraint "people_location_id_foreign" foreign key ("location_id") references "locations" ("id") on delete set null;`);
    this.addSql(`alter table "people" add constraint "people_industry_id_foreign" foreign key ("industry_id") references "industries" ("id") on delete restrict;`);

    this.addSql(`alter table "person_street_address_location_relation" add constraint "person_street_address_location_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_street_address_location_relation" add constraint "person_street_address_location_relation_street_a_79ddc_foreign" foreign key ("street_address_id") references "locations" ("id") on delete restrict;`);

    this.addSql(`alter table "person_location_name_relation" add constraint "person_location_name_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_location_name_relation" add constraint "person_location_name_relation_location_name_id_foreign" foreign key ("location_name_id") references "location_names" ("id") on delete restrict;`);

    this.addSql(`alter table "person_languages_relation" add constraint "person_languages_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_languages_relation" add constraint "person_languages_relation_language_id_foreign" foreign key ("language_id") references "languages" ("id") on delete restrict;`);

    this.addSql(`alter table "person_interests_relation" add constraint "person_interests_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_interests_relation" add constraint "person_interests_relation_interest_id_foreign" foreign key ("interest_id") references "interests" ("id") on delete restrict;`);

    this.addSql(`alter table "person_countries_relation" add constraint "person_countries_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_countries_relation" add constraint "person_countries_relation_country_id_foreign" foreign key ("country_id") references "countries" ("id") on delete restrict;`);

    this.addSql(`alter table "person_certificate_relation" add constraint "person_certificate_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_certificate_relation" add constraint "person_certificate_relation_certificate_id_foreign" foreign key ("certificate_id") references "person_certificates" ("id") on delete restrict;`);

    this.addSql(`alter table "companies" add constraint "companies_size_id_foreign" foreign key ("size_id") references "company_sizes" ("id") on delete set null;`);
    this.addSql(`alter table "companies" add constraint "companies_industry_id_foreign" foreign key ("industry_id") references "industries" ("id") on delete set null;`);
    this.addSql(`alter table "companies" add constraint "companies_location_id_foreign" foreign key ("location_id") references "locations" ("id") on delete set null;`);

    this.addSql(`alter table "schools" add constraint "schools_type_id_foreign" foreign key ("type_id") references "school_types" ("id") on delete set null;`);
    this.addSql(`alter table "schools" add constraint "schools_location_id_foreign" foreign key ("location_id") references "locations" ("id") on delete set null;`);

    this.addSql(`alter table "educations" add constraint "educations_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "educations" add constraint "educations_school_id_foreign" foreign key ("school_id") references "schools" ("id") on delete set null;`);

    this.addSql(`alter table "education_degrees_relation" add constraint "education_degrees_relation_education_id_foreign" foreign key ("education_id") references "educations" ("id") on delete cascade;`);
    this.addSql(`alter table "education_degrees_relation" add constraint "education_degrees_relation_degree_id_foreign" foreign key ("degree_id") references "degrees" ("id") on delete restrict;`);

    this.addSql(`alter table "person_skill_relation" add constraint "person_skill_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_skill_relation" add constraint "person_skill_relation_skill_id_foreign" foreign key ("skill_id") references "skills" ("id") on delete restrict;`);

    this.addSql(`alter table "person_social_profiles_relation" add constraint "person_social_profiles_relation_person_id_foreign" foreign key ("person_id") references "people" ("id") on delete cascade;`);
    this.addSql(`alter table "person_social_profiles_relation" add constraint "person_social_profiles_relation_profile_id_foreign" foreign key ("profile_id") references "social_profiles" ("id") on delete restrict;`);

    this.addSql(`alter table "company_social_profiles_relation" add constraint "company_social_profiles_relation_company_id_foreign" foreign key ("company_id") references "companies" ("id") on delete cascade;`);
    this.addSql(`alter table "company_social_profiles_relation" add constraint "company_social_profiles_relation_profile_id_foreign" foreign key ("profile_id") references "social_profiles" ("id") on delete restrict;`);

    this.addSql(`alter table "education_study_fields_relation" add constraint "education_study_fields_relation_education_id_foreign" foreign key ("education_id") references "educations" ("id") on delete cascade;`);
    this.addSql(`alter table "education_study_fields_relation" add constraint "education_study_fields_relation_study_field_id_foreign" foreign key ("study_field_id") references "study_fields" ("id") on delete restrict;`);

    this.addSql(`alter table "jobs" add constraint "jobs_industry_id_foreign" foreign key ("industry_id") references "industries" ("id") on delete restrict;`);
    this.addSql(`alter table "jobs" add constraint "jobs_title_id_foreign" foreign key ("title_id") references "titles" ("id") on delete restrict;`);
    this.addSql(`alter table "jobs" add constraint "jobs_company_id_foreign" foreign key ("company_id") references "companies" ("id");`);

    this.addSql(`alter table "job_role_relation" add constraint "job_role_relation_job_id_foreign" foreign key ("job_id") references "jobs" ("id");`);
    this.addSql(`alter table "job_role_relation" add constraint "job_role_relation_role_id_foreign" foreign key ("role_id") references "job_roles" ("id");`);

    this.addSql(`alter table "job_level_relation" add constraint "job_level_relation_job_id_foreign" foreign key ("job_id") references "jobs" ("id");`);
    this.addSql(`alter table "job_level_relation" add constraint "job_level_relation_level_id_foreign" foreign key ("level_id") references "levels" ("id");`);

    this.addSql(`alter table "expriences" add constraint "expriences_company_id_foreign" foreign key ("company_id") references "companies" ("id") on delete restrict;`);
    this.addSql(`alter table "expriences" add constraint "expriences_title_id_foreign" foreign key ("title_id") references "titles" ("id") on delete restrict;`);

    this.addSql(`alter table "exprience_location_name_relation" add constraint "exprience_location_name_relation_exprience_id_foreign" foreign key ("exprience_id") references "expriences" ("id") on delete cascade;`);
    this.addSql(`alter table "exprience_location_name_relation" add constraint "exprience_location_name_relation_location_name_id_foreign" foreign key ("location_name_id") references "location_names" ("id") on delete restrict;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "companies" drop constraint "companies_size_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_continent_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_country_id_foreign";`);
    this.addSql(`alter table "person_countries_relation" drop constraint "person_countries_relation_country_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_county_id_foreign";`);
    this.addSql(`alter table "education_degrees_relation" drop constraint "education_degrees_relation_degree_id_foreign";`);
    this.addSql(`alter table "people" drop constraint "people_industry_id_foreign";`);
    this.addSql(`alter table "companies" drop constraint "companies_industry_id_foreign";`);
    this.addSql(`alter table "jobs" drop constraint "jobs_industry_id_foreign";`);
    this.addSql(`alter table "person_interests_relation" drop constraint "person_interests_relation_interest_id_foreign";`);
    this.addSql(`alter table "job_role_relation" drop constraint "job_role_relation_role_id_foreign";`);
    this.addSql(`alter table "person_languages_relation" drop constraint "person_languages_relation_language_id_foreign";`);
    this.addSql(`alter table "job_level_relation" drop constraint "job_level_relation_level_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_locality_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_name_id_foreign";`);
    this.addSql(`alter table "person_location_name_relation" drop constraint "person_location_name_relation_location_name_id_foreign";`);
    this.addSql(`alter table "exprience_location_name_relation" drop constraint "exprience_location_name_relation_location_name_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_metro_id_foreign";`);
    this.addSql(`alter table "person_certificate_relation" drop constraint "person_certificate_relation_certificate_id_foreign";`);
    this.addSql(`alter table "people" drop constraint "people_inferred_salary_id_foreign";`);
    this.addSql(`alter table "locations" drop constraint "locations_region_id_foreign";`);
    this.addSql(`alter table "people" drop constraint "people_location_id_foreign";`);
    this.addSql(`alter table "person_street_address_location_relation" drop constraint "person_street_address_location_relation_street_a_79ddc_foreign";`);
    this.addSql(`alter table "companies" drop constraint "companies_location_id_foreign";`);
    this.addSql(`alter table "schools" drop constraint "schools_location_id_foreign";`);
    this.addSql(`alter table "person_street_address_location_relation" drop constraint "person_street_address_location_relation_person_id_foreign";`);
    this.addSql(`alter table "person_location_name_relation" drop constraint "person_location_name_relation_person_id_foreign";`);
    this.addSql(`alter table "person_languages_relation" drop constraint "person_languages_relation_person_id_foreign";`);
    this.addSql(`alter table "person_interests_relation" drop constraint "person_interests_relation_person_id_foreign";`);
    this.addSql(`alter table "person_countries_relation" drop constraint "person_countries_relation_person_id_foreign";`);
    this.addSql(`alter table "person_certificate_relation" drop constraint "person_certificate_relation_person_id_foreign";`);
    this.addSql(`alter table "educations" drop constraint "educations_person_id_foreign";`);
    this.addSql(`alter table "person_skill_relation" drop constraint "person_skill_relation_person_id_foreign";`);
    this.addSql(`alter table "person_social_profiles_relation" drop constraint "person_social_profiles_relation_person_id_foreign";`);
    this.addSql(`alter table "company_social_profiles_relation" drop constraint "company_social_profiles_relation_company_id_foreign";`);
    this.addSql(`alter table "jobs" drop constraint "jobs_company_id_foreign";`);
    this.addSql(`alter table "expriences" drop constraint "expriences_company_id_foreign";`);
    this.addSql(`alter table "schools" drop constraint "schools_type_id_foreign";`);
    this.addSql(`alter table "educations" drop constraint "educations_school_id_foreign";`);
    this.addSql(`alter table "education_degrees_relation" drop constraint "education_degrees_relation_education_id_foreign";`);
    this.addSql(`alter table "education_study_fields_relation" drop constraint "education_study_fields_relation_education_id_foreign";`);
    this.addSql(`alter table "person_skill_relation" drop constraint "person_skill_relation_skill_id_foreign";`);
    this.addSql(`alter table "person_social_profiles_relation" drop constraint "person_social_profiles_relation_profile_id_foreign";`);
    this.addSql(`alter table "company_social_profiles_relation" drop constraint "company_social_profiles_relation_profile_id_foreign";`);
    this.addSql(`alter table "education_study_fields_relation" drop constraint "education_study_fields_relation_study_field_id_foreign";`);
    this.addSql(`alter table "jobs" drop constraint "jobs_title_id_foreign";`);
    this.addSql(`alter table "expriences" drop constraint "expriences_title_id_foreign";`);
    this.addSql(`alter table "job_role_relation" drop constraint "job_role_relation_job_id_foreign";`);
    this.addSql(`alter table "job_level_relation" drop constraint "job_level_relation_job_id_foreign";`);
    this.addSql(`alter table "exprience_location_name_relation" drop constraint "exprience_location_name_relation_exprience_id_foreign";`);

    this.addSql(`drop table if exists "company_sizes" cascade;`);
    this.addSql(`drop table if exists "continents" cascade;`);
    this.addSql(`drop table if exists "countries" cascade;`);
    this.addSql(`drop table if exists "counties" cascade;`);
    this.addSql(`drop table if exists "degrees" cascade;`);
    this.addSql(`drop table if exists "industries" cascade;`);
    this.addSql(`drop table if exists "interests" cascade;`);
    this.addSql(`drop table if exists "job_roles" cascade;`);
    this.addSql(`drop table if exists "languages" cascade;`);
    this.addSql(`drop table if exists "levels" cascade;`);
    this.addSql(`drop table if exists "localities" cascade;`);
    this.addSql(`drop table if exists "location_names" cascade;`);
    this.addSql(`drop table if exists "metros" cascade;`);
    this.addSql(`drop table if exists "person_certificates" cascade;`);
    this.addSql(`drop table if exists "person_emails" cascade;`);
    this.addSql(`drop table if exists "person_phones" cascade;`);
    this.addSql(`drop table if exists "person_salaries" cascade;`);
    this.addSql(`drop table if exists "regions" cascade;`);
    this.addSql(`drop table if exists "locations" cascade;`);
    this.addSql(`drop table if exists "people" cascade;`);
    this.addSql(`drop table if exists "person_street_address_location_relation" cascade;`);
    this.addSql(`drop table if exists "person_location_name_relation" cascade;`);
    this.addSql(`drop table if exists "person_languages_relation" cascade;`);
    this.addSql(`drop table if exists "person_interests_relation" cascade;`);
    this.addSql(`drop table if exists "person_countries_relation" cascade;`);
    this.addSql(`drop table if exists "person_certificate_relation" cascade;`);
    this.addSql(`drop table if exists "companies" cascade;`);
    this.addSql(`drop table if exists "school_types" cascade;`);
    this.addSql(`drop table if exists "schools" cascade;`);
    this.addSql(`drop table if exists "educations" cascade;`);
    this.addSql(`drop table if exists "education_degrees_relation" cascade;`);
    this.addSql(`drop table if exists "skills" cascade;`);
    this.addSql(`drop table if exists "person_skill_relation" cascade;`);
    this.addSql(`drop table if exists "social_profiles" cascade;`);
    this.addSql(`drop table if exists "person_social_profiles_relation" cascade;`);
    this.addSql(`drop table if exists "company_social_profiles_relation" cascade;`);
    this.addSql(`drop table if exists "study_fields" cascade;`);
    this.addSql(`drop table if exists "education_study_fields_relation" cascade;`);
    this.addSql(`drop table if exists "titles" cascade;`);
    this.addSql(`drop table if exists "jobs" cascade;`);
    this.addSql(`drop table if exists "job_role_relation" cascade;`);
    this.addSql(`drop table if exists "job_level_relation" cascade;`);
    this.addSql(`drop table if exists "expriences" cascade;`);
    this.addSql(`drop table if exists "exprience_location_name_relation" cascade;`);
  }

}
