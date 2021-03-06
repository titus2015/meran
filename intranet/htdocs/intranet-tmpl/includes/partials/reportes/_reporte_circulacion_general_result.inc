[% IF cantidad %]
    <div class="well">
        <div class="resultados_consulta">[% "La cantidad de ejemplares prestados en el per&iacute;odo seleccionado es" | i18n %]: <strong>[% cantidad %]</strong></div>
    </div>
[% END %]

[% IF cantidad %]
    <h5>Totales:</h5>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>[% "Cantidad de Renovaciones" | i18n %]</th>
                <th>[% "Cantidad de Usuarios" | i18n %]</th>
                <th>[% "Cantidad de Devoluciones" | i18n %]</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>[% totales.cantidad_renovaciones %]</td>
                <td>[% totales.cantidad_usuarios %]</td>
                <td>[% totales.cantidad_devoluciones %]</td>
            </tr>
    </table>   
  [% IF !exportar %]
    <div class="form-actions"  >
          [% PERL %]
                    print C4::AR::Filtros::action_button(    
                            button  => 'btn click btn-primary',
                            title   => " [% 'Exportar a PDF' | i18n %]",
                            action  => 'imprimirReporte("formReporteCiruculacionGeneral","PDF");',
                            icon    => "icon-white icon-inbox",
                      ) ;
          [% END %]
          [% PERL %]
                    print C4::AR::Filtros::action_button(    
                            button  => 'btn click btn-primary',
                            title   => " [% 'Exportar a XLS' | i18n %]",
                            action  => 'imprimirReporte("formReporteCiruculacionGeneral","XLS");',
                            icon    => "icon-white icon-inbox",
                      ) ;
          [% END %]
    </div>
    [% END %]
[% ELSE %]
    <div class="alert alert-info">
        [% 'No hay resultados para mostrar' | i18n  %]
    </div>
[% END %]