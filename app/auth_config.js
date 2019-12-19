module.exports = {
  domain: process.env.domain,
  clientId: process.env.clientId,
  audience: process.env.audience,
  scopes: [
    "read:operator",
    "read:address",
    "read:person",
    "read:contact",
    "read:pilot",
    "read:aircraft",
    "read:authorization",
    "read:activity",
    "read:address:privileged",
    "read:aircraft:privileged",
    "read:operator:privileged",
    "read:contact:privileged",
    "read:pilot:privileged"
]
,
};
