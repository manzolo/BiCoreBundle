<?php

namespace Cdf\BiCoreBundle\Controller;

use Cdf\BiCoreBundle\Utils\Export\TabellaXls;
use Cdf\BiCoreBundle\Utils\Tabella\ParametriTabella;
use Cdf\BiCoreBundle\Utils\Tabella\Tabella;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Doctrine\Persistence\ManagerRegistry;

trait FiCoreTabellaControllerTrait
{
    public function tabella(Request $request, ManagerRegistry $doctrine): Response
    {
        if (!$this->permessi->canRead($this->getController())) {
            throw new AccessDeniedException('Non si hanno i permessi per visualizzare questo contenuto');
        }

        $parametripassati = array_merge($request->get('parametri'), ['user' => $this->getUser()]);
        $parametriform = isset($parametripassati['parametriform']) ?
                json_decode(ParametriTabella::getParameter($parametripassati['parametriform']), true) : [];
        $classbundle = ParametriTabella::getParameter($parametripassati['entityclass']);
        $formbundle = ParametriTabella::getParameter($parametripassati['formclass']);
        $formType = $formbundle . 'Type';

        $entity = new $classbundle();
        $controller = ParametriTabella::getParameter($parametripassati['nomecontroller']);
        $form = $this->createForm(
            $formType,
            $entity,
            ['attr' => [
                        'id' => 'formdati' . $controller,
                    ],
                    'action' => $this->generateUrl($controller . '_new'),
                    'parametriform' => $parametriform,
                ]
        );

        $parametri = array_merge($parametripassati, $this->getParametriTabella($doctrine, $parametripassati));
        $parametri['form'] = $form->createView();
        $templateobj = $this->getTabellaTemplateInformations($controller);
        $parametri['templatelocation'] = $templateobj['path'];

        return $this->render(
            $templateobj['template'],
            ['parametri' => $parametri]
        );
    }
    public function exportXls(Request $request, TabellaXls $tabellaxls, ManagerRegistry $doctrine): JsonResponse
    {
        try {
            $parametripassati = array_merge($request->get('parametri'), ['user' => $this->getUser()]);
            $parametripassati['estraituttirecords'] = ParametriTabella::setParameter('1');

            $filexls = $tabellaxls->esportaexcel($this->getParametriTabellaXls($doctrine, $parametripassati));
            $filexlsbuffer = file_get_contents($filexls);
            if ($filexlsbuffer === false) {
                $response = [
                    'status' => '500',
                    'file' => 'Impossibile leggere il file excel generato',
                ];
            } else {
                if (file_exists($filexls)) {
                    $response = [
                        'status' => '200',
                        'file' => 'data:application/vnd.ms-excel;base64,' . base64_encode($filexlsbuffer),
                    ];
                    try {
                        unlink($filexls);
                    } catch (\Exception $e) {
                        //IGNORE THE ERROR OF UNLINK
                    }
                } else {
                    $response = [
                        'status' => '501',
                        'file' => 'Impossibile generare il file excel',
                    ];
                }
            }
        } catch (\Exception $exc) {
            $response = [
                'status' => '500',
                'file' => $exc->getFile() . ' -> Riga: ' . $exc->getLine() . ' -> ' . $exc->getMessage(),
            ];
        }

        return new JsonResponse($response);
    }
    /**
     *
     * @param array<mixed> $parametripassati
     * @return array<mixed>
     */
    protected function getParametriTabella(ManagerRegistry $doctrine, array $parametripassati)
    {
        $configurazionetabella = new Tabella($doctrine, $parametripassati);
        $parametritabella = [
            'parametritabella' => $configurazionetabella->getConfigurazionecolonnetabella(),
            'recordstabella' => $this->getRecordsTabella($configurazionetabella),
            'paginacorrente' => $configurazionetabella->getPaginacorrente(),
            'paginetotali' => $configurazionetabella->getPaginetotali(),
            'righetotali' => $configurazionetabella->getRighetotali(),
            'traduzionefiltri' => $configurazionetabella->getTraduzionefiltri(),
        ];

        return $parametritabella;
    }
    /**
     * Append records to the given parameters of table.
     * It deals the difference between an API service or a ORM service.
     *
     * @param mixed $configurazionetabella
     * @return mixed
     */
    private function getRecordsTabella(&$configurazionetabella)
    {
        $results = [];
        $results = $configurazionetabella->getRecordstabella();
        return $results;
    }
    /**
     *
     * @param array<mixed> $parametripassati
     * @return array<mixed>
     */
    protected function getParametriTabellaXls(ManagerRegistry $doctrine, array $parametripassati): array
    {
        $configurazionetabella = new Tabella($doctrine, $parametripassati);
        $parametritabella = [
            'parametritabella' => $configurazionetabella->getConfigurazionecolonnetabella(),
            'recordstabella' => $this->getRecordsTabella($configurazionetabella),
            'paginacorrente' => $configurazionetabella->getPaginacorrente(),
            'paginetotali' => $configurazionetabella->getPaginetotali(),
            'righetotali' => $configurazionetabella->getRighetotali(),
            'traduzionefiltri' => $configurazionetabella->getTraduzionefiltri(),
            'nomecontroller' => ParametriTabella::getParameter($parametripassati['nomecontroller']),
        ];

        return $parametritabella;
    }
    /**
     *
     * @param string $controller
     * @return array<string>
     */
    protected function getTabellaTemplateInformations(string $controller): array
    {
        $template = $controller . '/Tabella/tabellacontainer.html.twig';
        $path = $controller . '/';
        if (!$this->template->getLoader()->exists($template)) {
            $template = '@BiCore/' . $controller . '/Tabella/tabellacontainer.html.twig';
            $path = '@BiCore/' . $controller . '/';
            if (!$this->template->getLoader()->exists($template)) {
                $path = '@BiCore/Standard/';
                $template = $path . 'Tabella/tabellacontainer.html.twig';
            }
        }

        return ['path' => $path, 'template' => $template];
    }
}
