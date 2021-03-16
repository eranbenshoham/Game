// import namor from "namor";
import externalFile from './Configurations'
const myData = [
  [
    `
   - Tenant portal acceleration
   - SDK/Integration platform as part of tenant portal.
  `,
    `
   - Tenant Portal Acceleration
   - Wireline onboarding package
   - Enhanced reporting and analytics`
   ,
  `- Tenant portal Acceleration Wireline onboard Reporting/Analytics
   - Additional OOTB interfaces. Pre-integrated 3p.
   - Partner marketplace/ecosystem`
  ],
  [
    `
   - Enhanced SMB/B2B support.
   - Hierarchies, customer-specific pricing and charge redirections`,
    `- B2B/SMB support.
   - Fixed-line ordering and billing.
   - Interfaces to inventory systems and long-running/complex order support including Workforce management stubs.`,
    `- B2B.SMB support Fixed-line
   - Enhanced subscription billing/OTT/3p ordering and management.
   - Support for IPTV ordering and management.   Stubs for VoD integration.`
  ],
  [
    `- Additional configuration controls for selfcare and retail channels.`,
    `- Configuration Enhanced self-care building blocks.`,
    `- Configuration Selfcare Native Mobile Apps OOTB “theme packs More configuration controls"`
  ],
  [
    `
    - Tenant-aware monitoring and execution
    - Streamlined upgradeability Initial Task automation`,
    `- Operational improvements
    - Cloud-native elasticity for billing and rating
    - Initial cost-reduction refactoring`,
    `- Operational Improvements Elasticity
    - Additional cloud-native tools and technologies.  Serverless Initial move away from databases`
  ],
  [
    `- Additional payment sources
     - Separate payment types per product
     - Invoice/statement/collections enhancements
     - GL and settlements work`,
    `- Billing infra work
     - Ordering integration framework and easy-to-use APIs
     - Initial partner onboarding work in SDK/tenant portal`,
    `- Billing Ordering framework Partner Onboarding
     - Infrastructure for partner self-onboarding.
     - Partner Settlements
     - Marketplace or integration with one`
  ]
];

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (index) => {
  const dataObj = {}
  externalFile.tableData[index].forEach((item, columnIndex) => {
    const columnData = item.split(';')
    let arrangeContent = ``
    columnData.forEach((data, i) => {
      arrangeContent += `${data}\n`
    })
    let accessor = (columnIndex + 1).toString()
    dataObj[`${accessor.toString()}`] = arrangeContent
  })
  return dataObj
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map((d, index) => {
      return {
        ...newPerson(index),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
