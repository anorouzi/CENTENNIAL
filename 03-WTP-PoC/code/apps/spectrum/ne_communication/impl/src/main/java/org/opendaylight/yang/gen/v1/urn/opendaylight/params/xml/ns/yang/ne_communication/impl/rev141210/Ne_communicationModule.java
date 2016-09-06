/*
 * Copyright © 2015 ZTE and others.  All rights reserved.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */
package org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.ne_communication.impl.rev141210;

import com.highstreet.technologies.odl.app.spectrum.impl.Ne_communicationProvider;

public class Ne_communicationModule extends org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.ne_communication.impl.rev141210.AbstractNe_communicationModule {
    public Ne_communicationModule(org.opendaylight.controller.config.api.ModuleIdentifier identifier, org.opendaylight.controller.config.api.DependencyResolver dependencyResolver) {
        super(identifier, dependencyResolver);
    }

    public Ne_communicationModule(org.opendaylight.controller.config.api.ModuleIdentifier identifier, org.opendaylight.controller.config.api.DependencyResolver dependencyResolver, org.opendaylight.yang.gen.v1.urn.opendaylight.params.xml.ns.yang.ne_communication.impl.rev141210.Ne_communicationModule oldModule, java.lang.AutoCloseable oldInstance) {
        super(identifier, dependencyResolver, oldModule, oldInstance);
    }

    @Override
    public void customValidation() {
        // add custom validation form module attributes here.
    }

    @Override
    public java.lang.AutoCloseable createInstance() {
        Ne_communicationProvider provider = new Ne_communicationProvider();
        getBrokerDependency().registerProvider(provider);
        return provider;
    }

}
