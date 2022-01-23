#!/bin/bash

# If a docker id is passed, then rebuild first
if [ "$1" != "" ];
then
    ./etc/bin/build.sh ${1} Y
fi

# This is a trick to redeploy. We change a parameter in the specifications
# of the deployment so we can patch the change. Here we're using
# the "terminationGracePeriodSeconds" and alternate up/down by 1 second every
# time, using a cached file to remember the value.
GRACEPERIOD=$(cat ./.grace 2> /dev/null)
# If it is the first time the script is run from the current directory, then
# we initialize to a value that is different than the default.
if [ "${GRACEPERIOD}" == "" ];
then
    GRACEPERIOD=6
else
    # Make sure it is a number by adding 0 to it
    GRACEPERIOD=$((${GRACEPERIOD} + 0))

    # Alternate the value between 30 and 31 seconds
    if [ ${GRACEPERIOD} -eq 5 ];
    then
        GRACEPERIOD=6
    else
        GRACEPERIOD=5
    fi
fi
# Cache the value for next time.
echo "${GRACEPERIOD}" > ./.grace

# Run the patch command
kubectl patch deployment --namespace jsc-k3s-dashboard k3s-dashboard \
    -p "{\"spec\":{\"template\":{\"spec\":{\"terminationGracePeriodSeconds\":${GRACEPERIOD}}}}}"