package C4::Modelo::CatControlSinonimoEditorial::Manager;

use strict;

use base qw(Rose::DB::Object::Manager);

use C4::Modelo::CatControlSinonimoEditorial;

sub object_class { 'C4::Modelo::CatControlSinonimoEditorial' }

__PACKAGE__->make_manager_methods('cat_control_sinonimo_editorial');

1;

