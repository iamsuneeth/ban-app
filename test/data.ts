import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { AccountClass } from "bank-core/src/types";
dayjs.extend(customParseFormat);

const accounts = [
  {
    id: "232323",
    accountNumber: "823232323",
    code: "ABCTR050000",
    balance: {
      amount: 32344.22,
      currency: "GBP"
    },
    nickName: "Current Account",
    overdraft: {
      amount: 323.33,
      currency: "GBP"
    },
    availableOverdraft: {
      amount: 1500,
      currency: "GBP"
    },
    availableBalance: {
      amount: 340,
      currency: "GBP"
    },
    openingDate: dayjs("2018-09-05", "YYYY-MM-DD"),
    customerId: 12567,
    type: "ADVANCE",
    debitCardAvailable: true,
    class: AccountClass.SAVINGS_AND_CURRENT
  },
  {
    id: "4567",
    accountNumber: "678904455",
    code: "ABCTR050000",
    balance: {
      amount: 456.22,
      currency: "GBP"
    },
    nickName: "Savings Account",
    overdraft: {
      amount: 45.33,
      currency: "GBP"
    },
    availableOverdraft: {
      amount: 2000,
      currency: "GBP"
    },
    availableBalance: {
      amount: 23,
      currency: "GBP"
    },
    openingDate: dayjs("2017-09-05", "YYYY-MM-DD"),
    customerId: 12567,
    type: "STANDARD",
    debitCardAvailable: false,
    class: AccountClass.SAVINGS_AND_CURRENT
  }
];

const summary = {
  balance: {
    amount: 32344.22,
    currency: "GBP"
  },
  availableOverdraft: {
    amount: 323.33,
    currency: "GBP"
  },
  usedOverdraft: {
    amount: 400,
    currency: "GBP"
  },
  availableBalance: {
    amount: 32567.55,
    currency: "GBP"
  },
  monthlyInfo: {
    spent: {
      amount: 345,
      currency: "GBP"
    },
    earned: {
      amount: 500,
      currency: "GBP"
    }
  }
};
const accountDetails = {
  id: "4567",
  accountNumber: "678904455",
  balance: {
    amount: 456.22,
    currency: "GBP"
  },
  nickName: "Savings Account",
  overdraft: {
    amount: 45.33,
    currency: "GBP"
  },
  availableOverdraft: {
    amount: 2000,
    currency: "GBP"
  },
  availableBalance: {
    amount: 23,
    currency: "GBP"
  },
  code: "ABCTR050000",
  customerId: 45678,
  openingDate: dayjs("2017-09-05", "YYYY-MM-DD"),

  type: "STANDARD",
  debitCardAvailable: false,
  class: AccountClass.SAVINGS_AND_CURRENT,
  partyDetails: {
    name: "party name",
    address: "address1,address2,address3,NNH H90,country",
    id: 45678,
    kyc: "complete"
  },
  branch: {
    name: "branch2 name",
    address: "ABC bank, somewhere in India, locality, state, 678 900, India",
    code: "ABCTR050000",
    bic: "ABCHIJK8901"
  },
  iban: "ABCDF3452345343670008"
};
export const TestData = {
  accounts,
  summary,
  accountDetails
};
