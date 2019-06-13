import update from 'immutability-helper';
import { entriesToObj, groupBy } from '../general-utils';

const groupsWithStudentDetails = db =>
  update(db.Groups, {
    $set: entriesToObj(
      Object.keys(db.Groups).map(groupUID => [
        groupUID,
        update(db.Groups[groupUID], {
          participants: {
            $set: entriesToObj(
              Object.keys(db.Groups[groupUID].participants).map(studentUID => [
                studentUID,
                update(db.Groups[groupUID].participants[studentUID], {
                  $set: db.Students[studentUID]
                })
              ])
            )
          }
        })
      ])
    )
  });

const studentUIDsInGroups = groups =>
  Object.values(groups)
    .map(({ participants }) => participants)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

const selectedStudentsEntries = students =>
  Object.entries(
    groupBy(
      students
        .filter(({ selected }) => selected)
        .map(({ groupUID, studentUID }) => ({ groupUID, studentUID })),
      'groupUID'
    )
  ).map(([key, values]) => [key, values.map(({ studentUID }) => studentUID)]);

export { groupsWithStudentDetails, studentUIDsInGroups, selectedStudentsEntries };
