import { Button, Descriptions, Input, Popconfirm, Table, Tag, Tooltip } from "antd";
import { useProveedorTypeSenseStore } from "../../../stores/proveedores/proveedorTypeSense.store";
import { useEffect, useState } from "react";

interface IProveedor {
  idProveedor: number;
  numeroProveedor: string;
  razonSocial: string;
  rfc: string;
  activo: boolean;
}

export const BusquedaProveedor = () => {


  const { proveedores: proveedoresTs, total } = useProveedorTypeSenseStore( state => state.proveedoresTS );
  const getProveedorTypeSense = useProveedorTypeSenseStore( state => state.getProveedorTypeSense );
  const loading = useProveedorTypeSenseStore( state => state.loading );

  const [proveedores, setProovedores] = useState<IProveedor[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchLastText, setSearchLastText] = useState("");
  const [pageSize, setPageSize] = useState( 50 );
  const [loadingLocal, setLoadingLocal] = useState(false);


  useEffect(() => {
    setLoadingLocal( loading );
  }, [loading])
  
  

  useEffect(() => {
    getProveedorTypeSense("","",1, pageSize);
  }, [])

  useEffect(() => {
    console.log("proveedoresTs : ", proveedoresTs);
  }, [proveedoresTs])


  useEffect(() => {
    const proveedoresMap = proveedoresTs.map((data) => {
      const el = data.proveedor;
  
      // Función para resaltar texto en cualquier campo
      const highlightText = (text: string) => 
        searchText ? text.replace(new RegExp(searchText, 'gi'), (match) => `<mark>${match}</mark>`) : text;
  
      return {
        idProveedor: el.idProveedor,
        numeroProveedor: highlightText(el.numeroProveedor), // Si aplica, lo dejamos como está
        razonSocial: highlightText(el.razonSocial),
        rfc: highlightText(el.rfc),
        activo: el.activo
      };
    });
  
    setProovedores(proveedoresMap);
  }, [proveedoresTs]);
  

  const handleSearch = ( paginacion = 1 ) => {

    setLoadingLocal( true );

    if ( searchLastText !== searchText ){ //si son diferentes quiere decir que hay una nueva busqeuda y la paginacion empieza desde 1
      console.log("BUsqueda nueva");
      getProveedorTypeSense(searchText, searchLastText, 1, pageSize);
    } else {
      console.log("busqueda no nueva : ", paginacion);
      getProveedorTypeSense(searchText, searchLastText, paginacion, pageSize); // de lo contrario, se cambia la paginacion
    }
    setSearchLastText( searchText ); // Se agrega la ultima busqueda cuando se obtiene la informacion


  }

  const handleBuscarBtn = () => {
    handleSearch();
  }

  
  const columns = [
    {
      title: 'Id Proveedor',
      dataIndex: 'idProveedor',
      key: 'idProveedor',
      highlight: true,
      hidden: true
    },
    {
      title: 'N° Proveedor',
      dataIndex: 'numeroProveedor',
      key: 'numeroProveedor',
      render: (text: string) => (
        <span 
          dangerouslySetInnerHTML={{ __html: text }} // Renderizar el HTML resaltado
        />
      ),
    },
    {
      title: 'Razón Social',
      dataIndex: 'razonSocial',
      key: 'razonSocial',
      render: (text: string) => (
        <span 
          dangerouslySetInnerHTML={{ __html: text }} // Renderizar el HTML resaltado
        />
      ),
    },
    {
      title: 'RFC',
      dataIndex: 'rfc',
      key: 'rfc',
      render: (text: string) => (
        <span 
          dangerouslySetInnerHTML={{ __html: text }} // Renderizar el HTML resaltado
        />
      ),
    },
    {
      title: 'Estatus',
      dataIndex: 'activo',
      key: 'activo',
      render: (activo: boolean) => (
        <Tag color={activo ? 'green' : 'red'}>
          {activo ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
  ];

  const mergedColumns = columns?.map((col) => ({
    ...col,
    // width: col.width || undefined,
    // sorter: col.sortable ? ((a, b) => String(a[col.dataIndex]).localeCompare(String(b[col.dataIndex]))) : undefined,
    onCell: (record: T): React.TdHTMLAttributes<HTMLElement> => ({
      record,
      dataIndex: col.dataIndex,
      inputType: col.inputType,
      // editing: isEditing(record),
      // editable: col.editable !== false,
    }),
  })) as ColumnType<T>[]

  const expandedRowRender = (idProveedor: number) => {

    const resultado = proveedoresTs.find( el => el.proveedor.idProveedor === idProveedor );

    
    if ( resultado ){
      const { proveedor, highlights } = resultado;
      // console.log("puto resultado :  ", highlights);
      return (
        <div>

          {highlights.length > 0 && (
            <Descriptions title="Coincidencias en la búsqueda">
              <Descriptions.Item label="Palabras coincidentes:">{ highlights.map( el => el.matched_tokens).join(', ') ?? 'No disponible' }</Descriptions.Item>
              <Descriptions.Item label="Coincidencias encontradas">
                { 
                  highlights.length > 0 
                      ? highlights.map((el, index) => {
                        return (
                          <div key={index}>
                              {Array.isArray(el.snippets)
                                ? el.snippets
                                    .filter((snippet, snippetIndex, arr) => snippetIndex === 0 || snippet !== arr[snippetIndex - 1]) // Evita elementos repetidos
                                    .map((snippet, snippetIndex) => (
                                      <span 
                                        key={`${index}-${snippetIndex}`}
                                        dangerouslySetInnerHTML={{ __html: decodeEntities(snippet) }} 
                                      />
                                    ))
                                : (
                                    <span 
                                      key={index}
                                      dangerouslySetInnerHTML={{ __html: decodeEntities(el.snippets) }} 
                                    />
                                )
                              }
                          </div>
                      )}) 
                      : 'No disponible'
                }
              </Descriptions.Item>
            </Descriptions>
          )}

          <Descriptions title="Resumen del Proveedor" >
            <Descriptions.Item label="Razón Social">{proveedor?.razonSocial ?? 'No disponible'}</Descriptions.Item>
            <Descriptions.Item label="RFC">{proveedor?.rfc ?? 'No disponible'}</Descriptions.Item>
            <Descriptions.Item label="Dirección">{proveedor?.Direccion ?? 'No disponible'}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Historial de Refrendo" >
            <Descriptions.Item label="Total de refrendos">{proveedor?.numeroRefrendo?.length}</Descriptions.Item>
            <Descriptions.Item label="Número de Refrendos">{proveedor?.numeroRefrendo?.join(', ') ?? 'No disponible'}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Historial de Documentos" >
            <Descriptions.Item label="Total de documentos">{proveedor?.documentos?.length}</Descriptions.Item>
            <Descriptions.Item label="Documentos">{proveedor?.documentos?.join(', ') ?? 'No disponible'}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Representantes y Contactos" >
            <Descriptions.Item label="Representantes">{proveedor?.representante?.join(', ') ?? 'No disponible'}</Descriptions.Item>
            <Descriptions.Item label="Contactos">{proveedor?.contactos?.join(', ') ?? 'No disponible'}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Otros Datos" >
            <Descriptions.Item label="Tipo de Proveedor">{proveedor?.tipoProveedor?.join(', ') ?? 'No disponible'}</Descriptions.Item>
            <Descriptions.Item label="Giro Comercial">{proveedor?.girosComerciales?.join(', ') ?? 'No disponible'}</Descriptions.Item>
          </Descriptions>
        </div>
      );
    } else {
      return null; // Si se quita, al no recibir datos, los campos crecen sin control
    }
  };

  function decodeEntities(text: string) {
    console.log("el texto : ", text);
    if (!text) return '';  // Si el texto es nulo o vacío, retornar una cadena vacía
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  
  return (
    <div className="bp__container d-flex flex-column pt-3 pb-3" 
      style={{ 
        width: '100vw'
      }}>

      <div className="d-flex justify-content-between "   >
        <Button
          // onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
          // disabled = { editingKey ? true : false }
          // disabled={!!editingKey || loading}
        >
          Nuevo
        </Button>

        <div className="input-group mb-3" style={{ width: 'auto'}}>
          <Input
            placeholder="Buscar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            // onChange={ handleSearchChange }
            style={{ width: "40vw" }}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button"
            onClick={handleBuscarBtn}
          >
              Buscar
          </button>
        </div>
      </div>
      
      <div className="tablaAnt flex-grow-1" 
        style={{ 
          width: "100%", 
          maxWidth: '100vw', 
          height: '100%', 
          overflow: 'auto' 
        }}>
        <Table 
          // columns={columns} 
          rowKey="idProveedor"
          dataSource={proveedores.length > 0 ? proveedores: []}
          expandable={{
            expandedRowKeys,
            onExpand: (expanded, record) => {
              setExpandedRowKeys(expanded ? [record.idProveedor] : []);
            },
            expandedRowRender: (record) => (
                expandedRowRender(record.idProveedor)
            ),
          }}
          columns={[
            ...(mergedColumns || []),
            {
              title: "Acciones",
              key: "actions",
              align: "center",
              width: "150px",
              render: (_: any, record: T) => {
                return (
                  <>
                    <Tooltip title="Editar elemento">
                      <Button
                        type="link"
                      >
                        <span className="material-symbols-outlined">
                          edit_square
                        </span>
                      </Button>
                    </Tooltip>
                    {record["activo"] ? (
                      <Popconfirm
                        title="¿Seguro que quieres eliminar esta fila?"
                      >
                        <Tooltip title="Eliminar elemento">
                          <Button 
                            type="link" 
                            danger
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    ) : (
                      <Popconfirm
                        title="¿Seguro que quieres restaurar este elemento?"
                        // onConfirm={() => handleReactive(record.key)}
                      >
                        <Tooltip title="Reactivar elemento">
                          <Button 
                            type="link"
                          >
                            <span className="material-symbols-outlined">
                              refresh
                            </span>
                          </Button>
                        </Tooltip>
                      </Popconfirm>
                    )}
                  </>
                );
              },
            },
          ]}
          pagination={{ 
            // pageSize: 20,
            total: total,
            pageSize: pageSize,
            defaultPageSize: pageSize,
            pageSizeOptions: ['10', '20', '50', '100', '250'],
            showSizeChanger: true,
            showTotal: (totalS, range) => `Mostrando ${range[0]}-${range[1]} de ${total}`,
            onChange: (pagina, pageSize) => {
              handleSearch( pagina );
            },
            onShowSizeChange: (current, size) => {
              setPageSize( size );
              handleSearch();
            },
          }}
          scroll={{ y: "50vh", x: "90%" }}
          style={{  width: '100%' }}
          loading = { loadingLocal }
          locale={{ emptyText: 'No hay datos disponibles' }}
        />
      </div>

      
    </div>
  )
}
