import archiver from 'archiver';
import path from 'path';
import faker from 'faker';
import { dataTypes } from './singleRequest';
import { ProvidedDataTypes, ProviderDatum } from './types';

const keys = Object.keys(dataTypes);

function generateData(type: ProvidedDataTypes) {
    switch (type) {
        case ProvidedDataTypes.EMAIL:
            return faker.internet.email();
        case ProvidedDataTypes.FIRST_NAME:
            return faker.name.firstName();
        case ProvidedDataTypes.LAST_NAME:
            return faker.name.lastName();
        case ProvidedDataTypes.FULL_NAME:
        case ProvidedDataTypes.UPLOADED_CONTACT:
            return faker.name.findName();
        case ProvidedDataTypes.IP_ADDRESS:
            return faker.internet.ip();
        case ProvidedDataTypes.USER_AGENT:
            return faker.internet.userAgent();
        case ProvidedDataTypes.USER_LANGUAGE:
            return faker.random.locale();
        case ProvidedDataTypes.COOKIE:
        case ProvidedDataTypes.HASHTAG_FOLLOWING:
        case ProvidedDataTypes.AD_INTEREST:
        case ProvidedDataTypes.DEVICE:
        case ProvidedDataTypes.LIKE:
        case ProvidedDataTypes.PEER_GROUP:
        case ProvidedDataTypes.INFERENCE:
            return faker.random.word();
        case ProvidedDataTypes.FOLLOWER:
        case ProvidedDataTypes.USERNAME:
        case ProvidedDataTypes.ACCOUNT_FOLLOWING:
        case ProvidedDataTypes.BLOCKED_ACCOUNT:
            return faker.internet.userName();
        case ProvidedDataTypes.TELEPHONE_NUMBER:
            return faker.phone.phoneNumber();
        case ProvidedDataTypes.COMMENT:
        case ProvidedDataTypes.MESSAGE:
            return faker.lorem.paragraph();
        case ProvidedDataTypes.PLACE_OF_RESIDENCE:
            return faker.address.city();
        case ProvidedDataTypes.ADDRESS:
            return {
                street: faker.address.streetName(),
                state: faker.address.state(),
                zipCode: faker.address.zipCode(),
            };
        case ProvidedDataTypes.COUNTRY:
            return faker.address.country();
        case ProvidedDataTypes.LOGIN_INSTANCE:
        case ProvidedDataTypes.LOGOUT_INSTANCE:
            return faker.random.number();
        case ProvidedDataTypes.PHOTO:
            return {
                url: faker.image.imageUrl(),
                description: faker.lorem.sentence()
            };
        case ProvidedDataTypes.GENDER:
            // @ts-ignore
            return faker.name.gender();
        case ProvidedDataTypes.PROFILE_PICTURE:
            return faker.image.imageUrl();
        case ProvidedDataTypes.DATE_OF_BIRTH:
            return faker.date.past(30);
        case ProvidedDataTypes.JOIN_DATE:
        case ProvidedDataTypes.REGISTRATION_DATE:
            return faker.date.past(2);
        case ProvidedDataTypes.SEARCH_QUERY:
        case ProvidedDataTypes.POST_SEEN:
            return faker.lorem.words(4);
        case ProvidedDataTypes.PRIVACY_SETTING:
            return {
                key: faker.lorem.word(),
                value: faker.lorem.word(),
            }
        case ProvidedDataTypes.SESSION:
            return {
                cookie_name: faker.lorem.word(),
                ip_address: faker.internet.ip(),
                language_code: faker.random.locale(),
                timestamp: faker.random.number(),
                user_agent: faker.internet.userAgent(),
                device_id: faker.random.uuid(),
            }
        case ProvidedDataTypes.EMPLOYMENT:
            return {
                job_title: faker.name.jobTitle(),
                company: faker.company.companyName(),
            };
        case ProvidedDataTypes.VISITED_PAGE:
            return {
                name: faker.lorem.word(),
                uri: faker.internet.url(),
            }
        case ProvidedDataTypes.OFF_SITE_ACTIVITY:
            return {
                type: faker.lorem.word(),
                website: faker.internet.url(),
            };
        case ProvidedDataTypes.EVENT_RESPONSE:
            return {
                name: faker.lorem.word(),
                response: faker.random.arrayElement(['accepted', 'declined']),
            };
        case ProvidedDataTypes.TIMEZONE:
            return faker.address.timeZone();
        case ProvidedDataTypes.CURRENCY:
            return faker.finance.currencyCode();
        case ProvidedDataTypes.EDUCATION_EXPERIENCE:
            return {
                institution: faker.company.companyName(),
                graduated: faker.random.boolean(),
                started_at: faker.date.past(),
                graduated_at: faker.date.future(),
            }
        case ProvidedDataTypes.MOBILE_DEVICE:
            return {
                type: faker.lorem.word()
            };
        case ProvidedDataTypes.PLAYED_SONG:
            return {
                artist: faker.lorem.words(2),
                track: faker.lorem.words(2),
                playDuration: faker.random.number(10000),
            };
    }
}

function generateDataPoint(type: string): Partial<ProviderDatum<unknown, unknown>> {
    return {
        data: generateData(type as ProvidedDataTypes),
        timestamp: faker.date.past(),
        type,
    }
}

/**
 * Generate a download archive filled with mocked data
 */
export async function generateArchive(): Promise<Buffer> {
    // Generate all data points
    const data = [...new Array(100)].map(() => {
        return generateDataPoint(keys[keys.length * Math.random() << 0]);
    });
    
    return new Promise(resolve => {
        // Init the buffer array
        const chunks: Buffer[] = []; 

        // Init the archive
        const archive = archiver('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        // When a piece of data comes in, we push in into the array
        archive.on('data', data => {
            chunks.push(data);
        });

        // When the archive is finished we resolve the whole thing
        archive.on('finish', () => {
            resolve(Buffer.concat(chunks));
        });

        // Then append the data, and finalize the archive
        archive.append(JSON.stringify(data, null, 4), { name: 'data.json' });
        archive.finalize();
    });
}
