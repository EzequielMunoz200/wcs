<?php

namespace App\Controller\Api\V1;

use App\Entity\Candidat;
use App\Repository\CandidatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\BrowserKit\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

/**
 * @Route("/api/v1", name="api_v1_")
 */
class CandidatController
{
    /**
     * @Route("/candidat/add/{name}", name="add_candidat", methods={"POST"})
     */
    public function add(string $name, EntityManagerInterface $em): JsonResponse
    {
        $candidat = new Candidat();
        $candidat->setName(trim(strip_tags($name)));
        if(strlen($name) > 0){
            $em->persist($candidat);
            $em->flush();

            return new JsonResponse(null, 201);
        }else{
            return new JsonResponse( ['error' => 'Nom vide ou invalide' ], 200);
        }
       

        
    }

    /**
     * @Route("/candidat/list", name="list_candidat", methods={"GET"})
     */
    public function list(CandidatRepository $candidatRepository): JsonResponse
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, ['json' => new JsonEncoder()]);

        $candidats = $candidatRepository->findAll();
        $jsonContent = $serializer->serialize($candidats, 'json');

        return new JsonResponse(json_decode($jsonContent));
    }
}
