const loadbalancer = {};
//*Service Users
loadbalancer.GATE_WAY_SERVICE_USERS = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return loadbalancer.isEnabled(
    service,
    newIndex,
    loadbalancer.GATE_WAY_SERVICE_USERS
  );
};
//*Service Products

loadbalancer.GATE_WAY_SERVICE_PRODUCTS = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return loadbalancer.isEnabled(
    service,
    newIndex,
    loadbalancer.GATE_WAY_SERVICE_PRODUCTS
  );
};

//*Service Transactions

loadbalancer.GATE_WAY_SERVICE_TRANSACTION = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return loadbalancer.isEnabled(
    service,
    newIndex,
    loadbalancer.GATE_WAY_SERVICE_TRANSACTION
  );
};

loadbalancer.isEnabled = (service, index, loadBalanceStrategy) => {
  return service.instances[index].enabled
    ? index
    : loadBalanceStrategy(service);
};

module.exports = loadbalancer;
